import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UserTypeDto {
  @IsString()
  @ApiProperty({ type: String, required: true })
  firstName: string;

  @IsString()
  @ApiProperty({ type: String, required: true })
  lastName: string;

  @IsEmail()
  @ApiProperty({ type: String, required: true })
  email: string;
}
