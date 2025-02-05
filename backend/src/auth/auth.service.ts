import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ITokenPayload } from '../types/types';
import { SignupAuthDto } from './dto/signup.auth.dto';
import { SigninAuthDto } from './dto/signin.auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signupAuthDto: SignupAuthDto) {
    const user = await this.userService.create(signupAuthDto);
    return this.token({ id: user.id, email: user.email });
  }

  async signIn(signinAuthDto: SigninAuthDto) {
    const user = await this.validateUser(signinAuthDto.email, signinAuthDto.password);
    return this.token({ id: user.id, email: user.email });
  }

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const passwordIsValid = await argon2.verify(user.password, pass);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  token(tokenPayload: ITokenPayload) {
    return { access_token: this.jwtService.sign({ ...tokenPayload }) };
  }
}
