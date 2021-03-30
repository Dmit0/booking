import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserTypeDto {
  @IsString()
  @ApiProperty({ type: String })
  firstName: string;
}
