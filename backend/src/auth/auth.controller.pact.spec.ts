import { assert, describe, it, vi } from 'vitest';
import { PactInteractionFile, processPactFiles } from '../../vitest.pact.utils';
import { INestApplication } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Verifier } from '@pact-foundation/pact';
import path from 'node:path';
import { attachment } from 'allure-js-commons';
import * as fs from 'node:fs';

const contracts: PactInteractionFile[] = processPactFiles('AuthController');

describe('Pact Verification AuthController', () => {
  let app: INestApplication;
  let userService: UserService;
  let userRepository: Repository<User>;
  let jwtService: JwtService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        JwtService,
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    app = module.createNestApplication({});
    jwtService = module.get<JwtService>(JwtService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    userService = module.get<UserService>(UserService);
    app.setGlobalPrefix('api');
    await app.init();
    await app.listen(3001);
  });

  afterAll(async () => {
    await app.close();
  });

  const stateHandlers = {
    'user is not in use': async (params) => {
      vi.spyOn(userRepository, 'findOneBy').mockResolvedValue(undefined);
      vi.spyOn(userRepository, 'save').mockResolvedValue({
        password: 'hashedPassword',
        ...params.user,
      } as User);
      vi.spyOn(jwtService, 'sign').mockReturnValue('mock-access-token');
      return Promise.resolve('Mocks email is not in use');
    },
    'user is already in use': async (params) => {
      vi.spyOn(userRepository, 'findOneBy').mockResolvedValue({
        ...params.user,
      });
      return Promise.resolve('Mocks email is in use');
    },
  };

  contracts.forEach(({ interaction, file }) => {
    it(`${interaction.description}`, async () => {
      try {
        await new Verifier({
          provider: 'AuthController',
          stateHandlers: stateHandlers,
          providerBaseUrl: 'http://127.0.0.1:3001',
          pactUrls: [path.resolve(__dirname, file)],
          failIfNoPactsFound: true,
        }).verifyProvider();
      } catch (e) {
        const contract = JSON.parse(fs.readFileSync(file, 'utf8'));
        await attachment('Contract', JSON.stringify(contract, null, 2), 'application/json');
        assert.fail(e.toString());
      }
    });
  });
});
