import { Injectable, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { BookingService } from '../booking/booking.service';
import { ErrorMessage } from '../core/enums/errors.enum';
import { PricePerDayFilter } from '../core/enums/filter.enum';
import { IRoomClosedResponse } from '../core/types/room.types';
import { UserService } from '../user/user.service';
import { GetRoomsDto, RoomCreateDto, RoomReservationDto } from './dto/room.dto';
import { RoomCreateResponseDto, RoomResponseDto } from './dto/room.response';
import { RoomRepositoryService } from './room.repository.service';
import { countRangeDates } from 'src/core/utils/date.utils';

@Injectable()
export class RoomService {
  constructor(private readonly repositoryService: RoomRepositoryService,
              private readonly userService: UserService,
              private readonly bookingService: BookingService,
  ) {
  }

  createRoom(data: RoomCreateDto): Observable<RoomCreateResponseDto> {
    return this.repositoryService.findOne({ name: data.name }).pipe(
      mergeMap(response => {
        if (response) throw new NotFoundException(ErrorMessage.ROOM_IS_EXIST)
        return this.repositoryService.createRoom(data);
      })
    );
  }

  reserveRoom(roomId: string, data: RoomReservationDto) {
    const { user, dateRange } = data;
    return this.repositoryService.findOne({ id: roomId }).pipe(
      mergeMap(room => {
        if (!room) {
          throw new NotFoundException(ErrorMessage.ROOM_NOT_FOUND);
        }
        return this.bookingService.checkIsRoomReserved(roomId, dateRange).pipe(
          mergeMap(isRoomReserved => {
            if (isRoomReserved) {
              throw new NotFoundException(ErrorMessage.ROOM_IS_RESERVED);
            }
            return this.userService.createUser(user).pipe(
              mergeMap(createdUser => this.bookingService.reservation({
                owner: createdUser,
                totalPrice: room.pricePerDay * countRangeDates(dateRange),
                dateRange,
                room,
              })))
          })
        )
      })
    )
  }

  getRooms(data: GetRoomsDto): Observable<RoomResponseDto> {
    const { from, to, pricePerDay, size, offset } = data;
    const priceOrder = RoomService.getPriceOrder(pricePerDay);
    if (from && to) {
      return this.bookingService.getCloseRooms({ from, to, size, offset }, priceOrder).pipe(
        mergeMap(closedRoomIds => this.repositoryService.getOpenedRooms(
          RoomService.getClosedRoomsArray(closedRoomIds),
          size,
          offset,
        )),
      );
    }
    return this.repositoryService.filterRooms(priceOrder, offset, size);
  }

  private static getClosedRoomsArray(closedRoomIds: IRoomClosedResponse[] | IRoomClosedResponse) {
    return Array.isArray(closedRoomIds)
      ? closedRoomIds.map(idObj => idObj.room_id)
      : [closedRoomIds.room_id];
  }
  
  private static getPriceOrder(pricePerDay?: PricePerDayFilter): { pricePerDay: PricePerDayFilter } {
    return {
      pricePerDay: pricePerDay
        ? pricePerDay
        : PricePerDayFilter.DESC,
    };
  }
}
