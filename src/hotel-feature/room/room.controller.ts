import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { GetEmptyRoomsDto, RoomReservationDto } from './dto/room.dto';
import { EmptyRoomResponseDto } from './dto/room.response';
import { RoomService } from './room.service';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get('getEmptyRooms')
  @ApiOkResponse({ type: EmptyRoomResponseDto })
  getEmptyRooms(@Query() data: GetEmptyRoomsDto) {
    console.log(data);
    return;
  }

  @Post('roomReservation')
  @ApiOkResponse({ type: Boolean })
  roomReservation(@Body() data: RoomReservationDto) {
    console.log(data);
    return;
  }
}
