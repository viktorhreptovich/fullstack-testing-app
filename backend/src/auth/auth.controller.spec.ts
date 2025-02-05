import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const user = {
    username: 'John Doe',
    email: 'jhon@example.com',
    password: 'hashedPassword',
  };

  const jwtToken = { access_token: 'jwtToken' };

  beforeEach(async () => {
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

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
    expect(authService).toBeDefined();
  });

  describe('signUp', () => {
    it('should call signUp method of AuthService and return JWT token', async () => {
      jest.spyOn(authService, 'signUp').mockResolvedValueOnce(jwtToken);

      const result = await authController.signUp(user);

      expect(authService.signUp).toHaveBeenCalledWith(user);
      expect(authService.signUp).toHaveBeenCalledTimes(1);
      expect(result).toEqual(jwtToken);
    });
  });

  describe('signIn', () => {
    it('should call signIn method of AuthService and return JWT token', async () => {
      jest.spyOn(authService, 'signIn').mockResolvedValueOnce(jwtToken);

      const result = await authController.signIn(user);

      expect(authService.signIn).toHaveBeenCalledWith(user);
      expect(authService.signIn).toHaveBeenCalledTimes(1);
      expect(result).toEqual(jwtToken);
    });
  });
});
