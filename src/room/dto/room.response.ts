import { ApiResponseProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { RoomType } from '../../core/enums';

export class RoomResponseDto {
  @ApiResponseProperty({ type: String })
  id: string ;

  @ApiResponseProperty({ type: Number })
  number: number;

  @ApiResponseProperty({ type: Number })
  pricePerDay: number;

  @ApiResponseProperty({ enum: RoomType })
  roomType: RoomType;

  @ApiResponseProperty({ type: String })
  name: string;
}

@Exclude()
export class PaginatedRoomResponseDto {
  @Type(() => RoomResponseDto)
  @ApiResponseProperty({ type: [RoomResponseDto] })
  rooms: RoomResponseDto[];

  @ApiResponseProperty({ type: Number })
  total: number;
}

@Exclude()
export class RoomBookingResponseDto {
  @ApiResponseProperty({ type: String })
  bookingId: string;
}

@Exclude()
export class RoomCreateResponseDto {
  @ApiResponseProperty({ type: String })
  roomId: string;
}
