import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { CreateUserDto } from './dto/create.user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import DuplicateEmailException from './exception/duplicate.email.exception';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.findOneByEmail(createUserDto.email);

    if (existUser) {
      throw new DuplicateEmailException(createUserDto.email);
    }

    const hashedPassword = await argon2.hash(createUserDto.password);
    const newUser = { ...createUserDto };
    newUser.password = hashedPassword;
    return await this.usersRepository.save(newUser);
  }

  async findOneById(id: number): Promise<User | undefined> {
    return await this.usersRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOneBy({ email });
  }
}
