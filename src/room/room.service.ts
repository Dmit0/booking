import { Injectable, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { BookingService } from '../booking/booking.service';
import { DateRangeDto } from '../core/dto/range.dto';
import { ErrorMessage } from '../core/enums/errors.enum';
import { PricePerDayFilter } from '../core/enums/filter.enum';
import { UserService } from '../user/user.service';
import { GetRoomsDto, RoomCreateDto, RoomReservationDto } from './dto/room.dto';
import { RoomCreateResponseDto } from './dto/room.response';
import { RoomRepositoryService } from './room.repository.service';
import * as moment from 'moment'

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

  countRangeDates(dateRange: DateRangeDto) {
    const start = moment(dateRange.from)
    const end = moment(dateRange.to)
    return Math.abs(start.diff(end, 'days'))
  }

  reserveRoom(roomId: string, data: RoomReservationDto) {
    const { user, dateRange } = data;
    console.log(this.countRangeDates(dateRange))
    return this.repositoryService.findOne({ id: roomId }).pipe(
      mergeMap(room => {
        if (!room) throw new NotFoundException(ErrorMessage.ROOM_NOT_FOUND)
        // TODO `validate for booked rooms`
        // return this.bookingService.checkIsRoomReserved(roomId, dateRange)
        return this.userService.createUser(user).pipe(
          mergeMap(createdUser => this.bookingService.reservation({
            owner: createdUser.id,
            room: roomId,
            totalPrice: room.pricePerDay * this.countRangeDates(dateRange),
            dateRange,
          }))
        )
      })
    )
  }

  private static getPriceOrder(pricePerDay?: PricePerDayFilter) {
    return {
      pricePerDay: pricePerDay
        ? pricePerDay
        : PricePerDayFilter.DESC,
    };
  }

  getRooms(data: GetRoomsDto) {
    const { from, to, pricePerDay, size, offset } = data;
    const priceOrder = RoomService.getPriceOrder(pricePerDay);
    if (from && to) {
      return this.bookingService.getCloseRooms({ from, to, size, offset }, priceOrder).pipe(
        mergeMap(closedRoomIds => this.repositoryService.getOpenedRooms(Array.isArray(closedRoomIds)
          ? closedRoomIds.map(idObj => idObj.room_id)
          : [closedRoomIds.room_id]
        ))
      )
    }
    return this.repositoryService.filterRooms(priceOrder, offset, size)
  }
}
