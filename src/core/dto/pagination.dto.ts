import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty({ type: Number, required: false })
  offset?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ type: Number, required: false })
  size?: number;
}