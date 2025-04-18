import { ApiProperty } from '@nestjs/swagger';
import { UserAuthDto } from './user.auth.dto';

export class SigninAuthResponseDto {
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  user: UserAuthDto;
}
