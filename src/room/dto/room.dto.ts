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
import { RoomType } from '../../core/enums/room-type.enum';
import { UserTypeDto } from '../../user/dto/user.dto';

export class FilterEmptyRoomsDto extends PaginationDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty({ type: Number, required: false })
  pricePerDay: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ type: Number, required: false })
  isEmpty: boolean;
}

export class GetRoomsDto {
  @ValidateNested({ each: true })
  @Type(() => DateRangeDto)
  @ApiProperty({ type: DateRangeDto })
  dateRange: DateRangeDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FilterEmptyRoomsDto)
  @ApiProperty({ type: FilterEmptyRoomsDto, required: false })
  filter: FilterEmptyRoomsDto;
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
