import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { ErrorResponseDto } from '../core/dto/error.response.dto';
import { ErrorMessage } from '../core/enums/errors.enum';
import {
  GetRoomsDto,
  RoomCreateDto, RoomReservationDto,
  RoomReservationParamsDto,
} from './dto/room.dto';
import {
  PaginatedRoomResponseDto,
  RoomBookingResponseDto,
  RoomCreateResponseDto,
} from './dto/room.response';
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
  ) {
    return this.roomService.reserveRoom(params.roomId, data)
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
