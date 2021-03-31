import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class DateRangeDto {
  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  from: Date;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  to: Date;
}