import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class DateRangeDto {
  @IsDateString()
  @ApiProperty({ type: Date })
  from: Date;

  @IsDateString()
  @ApiProperty({ type: Date })
  to: Date;
}