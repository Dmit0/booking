import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PaginationDto } from '../../core/dto/pagination.dto';
import { DateRangeDto } from '../../core/dto/range.dto';
import { PricePerDayFilter } from '../../core/enums/filter.enum';
import { RoomType } from '../../core/enums/room-type.enum';
import { UserTypeDto } from '../../user/dto/user.dto';

export class GetRoomsDto extends PaginationDto {
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => DateRangeDto)
  @ApiProperty({ type: DateRangeDto })
  dateRange: DateRangeDto;

  @IsOptional()
  @IsEnum(PricePerDayFilter)
  @ApiProperty({ enum: PricePerDayFilter, required: false })
  pricePerDay: PricePerDayFilter;
}

export class RoomReservationDto {
  @ValidateNested({ each: true })
  @Type(() => UserTypeDto)
  @ApiProperty({ type: UserTypeDto })
  user: UserTypeDto;

  @ValidateNested({ each: true })
  @Type(() => DateRangeDto)
  @ApiProperty({ type: DateRangeDto })
  dateRange: DateRangeDto;
}

export class RoomDto {
  @IsNumber()
  pricePerDay: number;

  @IsEnum(RoomType)
  roomType: RoomType;

  @IsString()
  name: string;
}

export class RoomReservationQueryDto {
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
