import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { PaginationDto } from '../../../core/dto/pagination.dto';
import { DateRangeDto } from '../../../core/dto/range.dto';
import { RoomType } from '../../../core/enums/room-type.enum';
import { UserTypeDto } from '../../../user/dto/user.dto';

export class FilterEmptyRoomsDto extends PaginationDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty({ type: Number, required: false })
  pricePerDay: number
}

export class GetEmptyRoomsDto {
  @ValidateNested({ each: true })
  @Type(() => DateRangeDto)
  @ApiProperty({ type: DateRangeDto })
  amountRange: DateRangeDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FilterEmptyRoomsDto)
  @ApiProperty({ type: FilterEmptyRoomsDto, required: false })
  filter: FilterEmptyRoomsDto
}

export class RoomReservationDto {
  @IsString()
  @ApiProperty({ type: String })
  roomId: string;

  @ValidateNested({ each: true })
  @Type(() => UserTypeDto)
  @ApiProperty({ type: UserTypeDto })
  user: UserTypeDto;
}

export class RoomDto {
  @IsNumber()
  pricePerDay: number;

  @IsEnum(RoomType)
  roomType: RoomType;
}