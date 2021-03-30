import { ApiResponseProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { RoomDto } from './room.dto';

@Exclude()
export class RoomResponseDto {
  @Type(() => RoomDto)
  @ApiResponseProperty({ type: [RoomDto] })
  rooms: RoomDto[];

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
