import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsNumberString()
  @ApiProperty({ type: Number, required: false })
  offset?: number;

  @IsOptional()
  @IsNumberString()
  @ApiProperty({ type: Number, required: false })
  size?: number;
}