import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaginationDto, DateRangeDto } from '../../core/dto';
import { PricePerDaySorting } from '../../core/enums';
import { RoomType } from '../../core/enums';
import { UserDto } from '../../user/dto';

export class GetRoomsDto extends PaginationDto {
  @IsOptional()
  @IsDateString()
  @ApiProperty({ type: String, required: false  })
  from: Date;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ type: String, required: false  })
  to: Date;

  @IsOptional()
  @IsEnum(PricePerDaySorting)
  @ApiProperty({ enum: PricePerDaySorting, required: false })
  pricePerDay: PricePerDaySorting;
}

export class RoomReservationDto {
  @Type(() => UserDto)
  @ApiProperty({ type: UserDto })
  user: UserDto;

  @Type(() => DateRangeDto)
  @ApiProperty({ type: DateRangeDto })
  dateRange: DateRangeDto;
}

export class RoomReservationParamsDto {
  @IsString()
  @ApiProperty({ type: String })
  roomId: string;
}

export class RoomCreateDto {
  @IsNumber()
  @ApiProperty({ type: Number })
  pricePerDay: number;

  @IsEnum(RoomType)
  @ApiProperty({ enum: RoomType })
  roomType: RoomType;

  @IsString()
  @ApiProperty({ type: String })
  name: string;
}
