import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class DateRangeDto {
  @IsDateString()
  @ApiProperty({ type: String })
  from: Date;

  @IsDateString()
  @ApiProperty({ type: String })
  to: Date;
}