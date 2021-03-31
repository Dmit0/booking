import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaginationDto } from '../../core/dto/pagination.dto';
import { DateRangeDto } from '../../core/dto/range.dto';
import { PricePerDayFilter } from '../../core/enums/filter.enum';
import { RoomType } from '../../core/enums/room-type.enum';
import { UserTypeDto } from '../../user/dto/user.dto';

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
  @IsEnum(PricePerDayFilter)
  @ApiProperty({ enum: PricePerDayFilter, required: false })
  pricePerDay: PricePerDayFilter;
}

export class RoomReservationDto {
  @Type(() => UserTypeDto)
  @ApiProperty({ type: UserTypeDto })
  user: UserTypeDto;

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
