import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import DuplicateEmailException from './exception/duplicate.email.exception';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('create', () => {
    it('should call findOneByEmail method of userService, hash password and return a user', async () => {
      const newUser = {
        username: 'John Doe',
        email: 'jhon@example.com',
        password: 'password',
      };
      const mockUser = {
        id: 1,
        username: 'John Doe',
        email: 'jhon@example.com',
        password: 'hashedPassword',
      };

      jest.spyOn(userService, 'findOneByEmail').mockResolvedValueOnce(undefined);
      jest.spyOn(argon2, 'hash').mockResolvedValueOnce('hashedPassword');
      jest.spyOn(userRepository, 'save').mockResolvedValueOnce(mockUser as never);

      const result = await userService.create(newUser);

      expect(result).toEqual(mockUser);
      expect(userService.findOneByEmail).toHaveBeenCalledWith(newUser.email);
      expect(userService.findOneByEmail).toHaveBeenCalledTimes(1);
      expect(argon2.hash).toHaveBeenCalledWith(newUser.password);
      expect(argon2.hash).toHaveBeenCalledTimes(1);
      expect(userRepository.save).toHaveBeenCalledWith({
        username: newUser.username,
        email: newUser.email,
        password: 'hashedPassword',
      });
      expect(userRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw DuplicateEmailException if user already exists', async () => {
      const duplicatedUser = {
        username: 'John Doe',
        email: 'jhon@example.com',
        password: 'password',
      };

      jest.spyOn(userService, 'findOneByEmail').mockResolvedValue(duplicatedUser as User);

      const create = () => userService.create(duplicatedUser);

      await expect(create).rejects.toThrow(DuplicateEmailException);
      await expect(create).rejects.toThrow(`Email "${duplicatedUser.email}" already in use`);
    });
  });

  describe('findOneByEmail', () => {
    it('should return a user by email', async () => {
      const user = {
        username: 'John Doe',
        email: 'jhon@example.com',
        password: 'hashedPassword',
      };

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(user as User);

      const result = await userService.findOneByEmail(user.email);

      expect(result).toEqual(user);
      expect(userRepository.findOneBy).toHaveBeenCalledWith({ email: user.email });
      expect(userRepository.findOneBy).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOneById', () => {
    it('should return a user by id', async () => {
      const user = {
        id: 1,
        username: 'John Doe',
        email: 'jhon@example.com',
        password: 'hashedPassword',
      };

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(user as User);

      const result = await userService.findOneById(user.id);

      expect(result).toEqual(user);
      expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: user.id });
      expect(userRepository.findOneBy).toHaveBeenCalledTimes(1);
    });
  });
});
