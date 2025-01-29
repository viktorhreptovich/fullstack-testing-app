import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('create', () => {
    it('should call create method of userService and return a user', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'jhon@example.com',
        password: 'password',
      };

      jest.spyOn(userService, 'create').mockResolvedValueOnce(newUser as User);

      const result = await userController.create(newUser);

      expect(userService.create).toHaveBeenCalledWith(newUser);
      expect(userService.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(newUser);
    });
  });
  describe('findOne', () => {
    it('should call findOne method of userService and return a user', async () => {
      const user = {
        id: 1,
        name: 'John Doe',
        email: 'jhon@example.com',
        password: 'hashedPassword',
      };

      jest.spyOn(userService, 'findOneById').mockResolvedValueOnce(user as User);

      const result = await userController.findOne(user.id.toString());

      expect(userService.findOneById).toHaveBeenCalledWith(user.id.toString());
      expect(userService.findOneById).toHaveBeenCalledTimes(1);
      expect(result).toEqual(user);
    });
  });
  describe('findOneByEmail', () => {
    it('should call findOneByEmail method of userService and return a user', async () => {
      const user = {
        id: 1,
        name: 'John Doe',
        email: 'jhon@example.com',
        password: 'hashedPassword',
      };

      jest.spyOn(userService, 'findOneByEmail').mockResolvedValueOnce(user as User);

      const result = await userController.findOneByEmail(user.email);

      expect(userService.findOneByEmail).toHaveBeenCalledWith(user.email);
      expect(userService.findOneByEmail).toHaveBeenCalledTimes(1);
      expect(result).toEqual(user);
    });
  });
});
