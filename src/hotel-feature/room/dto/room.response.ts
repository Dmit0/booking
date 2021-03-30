import { ApiResponseProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { RoomDto } from './room.dto';

@Exclude()
export class EmptyRoomResponseDto {
  @Type(() => RoomDto)
  @ApiResponseProperty({ type: [RoomDto] })
  rooms: RoomDto[];

  @ApiResponseProperty({ type: Number })
  total: number
}