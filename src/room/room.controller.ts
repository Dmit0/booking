import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { ErrorResponseDto } from '../core/dto';
import { ErrorMessage } from '../core/enums';
import {
  GetRoomsDto,
  RoomCreateDto,
  RoomReservationDto,
  RoomReservationParamsDto,
  PaginatedRoomResponseDto,
  RoomBookingResponseDto,
  RoomCreateResponseDto,
} from './dto';
import { RoomService } from './room.service';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  @ApiOkResponse({ type: PaginatedRoomResponseDto })
  @ApiBadRequestResponse({
    type: ErrorResponseDto,
    description: ErrorMessage.VALIDATION_ERROR,
  })
  getRooms(@Query() data: GetRoomsDto): Observable<PaginatedRoomResponseDto>{
    return this.roomService.getRooms(data);
  }

  @Post('reservation/:roomId')
  @ApiOkResponse({ type: RoomBookingResponseDto })
  @ApiBadRequestResponse({
    type: ErrorResponseDto,
    description: ErrorMessage.VALIDATION_ERROR,
  })
  @ApiNotFoundResponse({
    type: ErrorResponseDto,
    description: ErrorMessage.ROOM_NOT_FOUND,
  })
  reservation(
    @Param() params: RoomReservationParamsDto,
    @Body() data: RoomReservationDto,
  ): Observable<RoomBookingResponseDto> {
    return this.roomService.bookRoom(params.roomId, data);
  }

  @Post('create')
  @ApiOkResponse({ type: RoomCreateResponseDto })
  @ApiBadRequestResponse({
    type: ErrorResponseDto,
    description: ErrorMessage.VALIDATION_ERROR,
  })
  create(@Body() data: RoomCreateDto): Observable<RoomCreateResponseDto> {
    return this.roomService.createRoom(data);
  }
}
