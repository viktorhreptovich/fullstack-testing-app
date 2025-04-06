import { ApiProperty } from '@nestjs/swagger';

export class UserAuthDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;
}
