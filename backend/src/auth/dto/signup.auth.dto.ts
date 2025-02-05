import { IsEmail, MinLength } from 'class-validator';

export class SignupAuthDto {
  @MinLength(2, { message: 'Username must be at least 2 characters long' })
  username: string;

  @IsEmail({}, { message: 'Email is not valid' })
  email: string;

  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
