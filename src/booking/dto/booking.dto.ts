import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { DateRangeDto } from '../../core/dto/range.dto';

export class BookingDto {
  @IsString()
  userId: string;

  @IsString()
  roomId: string

  @ValidateNested({ each: true })
  @Type(() => DateRangeDto)
  @ApiProperty({ type: DateRangeDto })
  dateRange: DateRangeDto;
}