import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
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
  RoomReservationQueryDto,
} from './dto/room.dto';
import {
  RoomBookingResponseDto,
  RoomCreateResponseDto,
  RoomResponseDto,
} from './dto/room.response';
import { RoomService } from './room.service';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  @ApiOkResponse({ type: RoomResponseDto })
  @ApiBadRequestResponse({
    type: ErrorResponseDto,
    description: ErrorMessage.VALIDATION_ERROR,
  })
  getRooms(@Query() data: GetRoomsDto) {
    console.log(data);
    return;
  }

  @Post('roomReservation')
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
    @Query() params: RoomReservationQueryDto,
    @Body() data: RoomReservationDto,
  ) {
    return this.roomService.reserveRoom(params.roomId, data)
  }

  @Put('create')
  @ApiOkResponse({ type: RoomCreateResponseDto })
  @ApiBadRequestResponse({
    type: ErrorResponseDto,
    description: ErrorMessage.VALIDATION_ERROR,
  })
  create(@Body() data: RoomCreateDto): Observable<RoomCreateResponseDto> {
    return this.roomService.createRoom(data);
  }
}
