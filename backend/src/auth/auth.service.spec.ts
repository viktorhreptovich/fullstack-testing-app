import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import * as argon2 from 'argon2';
import { UserService } from '../user/user.service';
import { UnauthorizedException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  const jwtToken = 'jwtToken';
  const accessToken = { access_token: jwtToken };

  const mockUser = {
    id: 1,
    username: 'John',
    email: 'jhon@example.com',
    password: 'hashedPassword',
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
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

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(userService).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe('signUp', () => {
    it('should call create method of userService and return a access token', async () => {
      const newUser = {
        username: 'John Doe',
        email: 'jhon@example.com',
        password: 'password',
      };

      jest.spyOn(userService, 'create').mockImplementationOnce(() => Promise.resolve(mockUser as User));
      jest.spyOn(authService, 'token').mockReturnValue(accessToken);

      const result = await authService.signUp(newUser);

      expect(userService.create).toHaveBeenCalledWith(newUser);
      expect(authService.token).toHaveBeenCalledWith({ id: mockUser.id, email: mockUser.email });
      expect(result).toEqual({ ...accessToken, user: mockUser });
    });
  });

  describe('signUp', () => {
    it('should call validateUser method of authService and return a access token', async () => {
      const registeredUser = {
        email: 'jhon@example.com',
        password: 'password',
      };

      jest.spyOn(authService, 'validateUser').mockImplementationOnce(() => Promise.resolve(mockUser as User));
      jest.spyOn(authService, 'token').mockReturnValue(accessToken);

      const result = await authService.signIn(registeredUser);

      expect(authService.validateUser).toHaveBeenCalledWith(registeredUser.email, registeredUser.password);
      expect(authService.token).toHaveBeenCalledWith({ id: mockUser.id, email: mockUser.email });
      expect(result).toEqual({ ...accessToken, user: mockUser });
    });
  });

  describe('validateUser', () => {
    it('should call findOneByEmail method of userService, verify password and return a user', async () => {
      const user = {
        email: 'jhon@example.com',
        password: 'password',
      };

      jest.spyOn(userService, 'findOneByEmail').mockImplementationOnce(() => Promise.resolve(mockUser as User));
      jest.spyOn(argon2, 'verify').mockResolvedValue(true);

      const result = await authService.validateUser(user.email, user.password);

      expect(userService.findOneByEmail).toHaveBeenCalledWith(user.email);
      expect(userService.findOneByEmail).toHaveBeenCalledTimes(1);
      expect(argon2.verify).toHaveBeenCalledWith(mockUser.password, user.password);
      expect(result).toEqual(mockUser);
    });

    it('should throw UnauthorizedException if user is not found', async () => {
      const user = {
        email: 'jhon@example.com',
        password: 'password',
      };

      jest.spyOn(userService, 'findOneByEmail').mockResolvedValue(null);

      const validateUser = () => authService.validateUser(user.email, user.password);

      await expect(validateUser).rejects.toThrow(UnauthorizedException);
      await expect(validateUser).rejects.toThrow('Invalid credentials');
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
      const user = {
        email: 'jhon@example.com',
        password: 'wrongPassword',
      };

      jest.spyOn(userService, 'findOneByEmail').mockImplementation(() => Promise.resolve(mockUser as User));
      jest.spyOn(argon2, 'verify').mockResolvedValue(false);

      const validateUser = () => authService.validateUser(user.email, user.password);

      await expect(validateUser).rejects.toThrow(UnauthorizedException);
      await expect(validateUser).rejects.toThrow('Invalid credentials');
    });
  });

  describe('token', () => {
    it('should return a access token', () => {
      const tokenPayload = { id: 1, email: 'jhon@example.com' };

      jest.spyOn(jwtService, 'sign').mockReturnValue(jwtToken);

      expect(authService.token(tokenPayload)).toEqual(accessToken);
    });
  });
});
