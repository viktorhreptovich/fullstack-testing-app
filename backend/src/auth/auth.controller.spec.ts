import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    signUp: jest.fn(),
    signIn: jest.fn(),
    signOut: jest.fn(),
  };

  const user = {
    name: 'John Doe',
    email: 'jhon@example.com',
    password: 'hashedPassword',
  };

  const jwtToken = 'jwtToken';

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
    it('should call signUp method of AuthService', async () => {
      jest.spyOn(authService, 'signUp').mockResolvedValueOnce(jwtToken);

      const result = await authController.signUp(user);

      expect(authService.signUp).toHaveBeenCalledWith(user);
      expect(authService.signUp).toHaveBeenCalledTimes(1);
      expect(result).toEqual(jwtToken);
    });
  });

  describe('signIn', () => {
    it('should call signIn method of AuthService and return response', async () => {
      const response: Partial<Response> = {
        status: jest.fn(),
        cookie: jest.fn(),
      };

      jest.spyOn(authService, 'signIn').mockResolvedValueOnce(jwtToken);

      const result = await authController.signIn(user, response as Response);

      expect(authService.signIn).toHaveBeenCalledWith(user);
      expect(authService.signIn).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ message: 'Signed in successfully' });
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.cookie).toHaveBeenCalledWith('jwt', jwtToken, { httpOnly: true });
    });
  });

  describe('signOut', () => {
    it('should call signOut method of AuthService and return response', async () => {
      const response: Partial<Response> = {
        status: jest.fn(),
        clearCookie: jest.fn(),
      };

      const result = await authController.signOut(response as Response);

      expect(result).toEqual({ message: 'Signed out successfully' });
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.clearCookie).toHaveBeenCalledWith('jwt');
    });
  });
});
