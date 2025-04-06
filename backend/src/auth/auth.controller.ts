import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupAuthDto } from './dto/signup.auth.dto';
import { SigninAuthDto } from './dto/signin.auth.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SignupAuthResponseDto } from './dto/signup.auth.response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created and signed up',
    type: SignupAuthResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async signUp(@Body() signupAuthDto: SignupAuthDto) {
    return await this.authService.signUp(signupAuthDto);
  }

  @Post('signin')
  @HttpCode(200)
  @ApiOperation({ summary: 'Sign in a user' })
  @ApiResponse({ status: 200, description: 'Returns JWT token' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async signIn(@Body() signinAuthDto: SigninAuthDto) {
    return await this.authService.signIn(signinAuthDto);
  }
}
