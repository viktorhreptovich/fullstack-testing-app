import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupAuthDto } from './dto/signup.auth.dto';
import { SigninAuthDto } from './dto/signin.auth.dto';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signupAuthDto: SignupAuthDto) {
    return this.authService.signUp(signupAuthDto);
  }

  @Post('signin')
  async signIn(@Body() signinAuthDto: SigninAuthDto, @Res({ passthrough: true }) response: Response) {
    const jwt = await this.authService.signIn(signinAuthDto);
    response.status(200);
    response.cookie('jwt', jwt, { httpOnly: true });
    return { message: 'Signed in successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Post('signout')
  async signOut(@Res({ passthrough: true }) response: Response) {
    response.status(200);
    response.clearCookie('jwt');
    return { message: 'Signed out successfully' };
  }
}
