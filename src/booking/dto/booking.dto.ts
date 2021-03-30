import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { RoomDto } from 'src/room/dto/room.dto';
import { DateRangeDto } from '../../core/dto/range.dto';
import { UserTypeDto } from '../../user/dto/user.dto';

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

export class BookingCreateDto {

  @ValidateNested({ each: true })
  @Type(() => UserTypeDto)
  @ApiProperty({ type: UserTypeDto })
  owner: UserTypeDto;

  @ValidateNested({ each: true })
  @Type(() => RoomDto)
  @ApiProperty({ type: RoomDto })
  room: RoomDto;

  @ValidateNested({ each: true })
  @Type(() => DateRangeDto)
  @ApiProperty({ type: DateRangeDto })
  dateRange: DateRangeDto;

  @IsNumber()
  totalPrice: number;
}