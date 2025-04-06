import { ApiProperty } from '@nestjs/swagger';
import { UserAuthDto } from './user.auth.dto';

export class SignupAuthResponseDto {
  @ApiProperty()
  access_token: string;
  @ApiProperty()
  user: UserAuthDto;
}
