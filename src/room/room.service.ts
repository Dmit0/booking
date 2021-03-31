import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { BookingService } from '../booking';
import { ErrorMessage, PricePerDaySorting } from '../core/enums';
import { countRangeDates } from '../core/utils';
import { UserService } from '../user';
import {
  GetRoomsDto,
  RoomCreateDto,
  RoomReservationDto,
  PaginatedRoomResponseDto,
  RoomCreateResponseDto, RoomBookingResponseDto,
} from './dto';
import { RoomRepositoryService } from './room.repository.service';

@Injectable()
export class RoomService {
  constructor(
    private readonly repositoryService: RoomRepositoryService,
    private readonly userService: UserService,
    private readonly bookingService: BookingService,
  ) {}

  createRoom(data: RoomCreateDto): Observable<RoomCreateResponseDto> {
    return this.repositoryService.findOne({ name: data.name }).pipe(
      tap(existingRoom => {
        if(existingRoom) {
          throw new ConflictException(ErrorMessage.ROOM_IS_EXIST)
        }
      }),
      mergeMap(() => {
        return this.repositoryService.createRoom(data).pipe(
          map(room => ({ roomId: room.id }))
        );
      })
    );
  }

  bookRoom(roomId: string, data: RoomReservationDto): Observable<RoomBookingResponseDto> {
    const { user, dateRange } = data;
    return this.repositoryService.findOne({ id: roomId }).pipe(
      tap(room => {
        if (!room) {
          throw new NotFoundException(ErrorMessage.ROOM_NOT_FOUND);
        }
      }),
      mergeMap(room => {
        return this.bookingService.checkRoomIsReserved(roomId, dateRange).pipe(
          tap(reserved => {
            if (reserved) {
              throw new ConflictException(ErrorMessage.ROOM_IS_RESERVED);
            }
          }),
          mergeMap(() => this.userService.createUser(user).pipe(
            mergeMap(createdUser => this.bookingService.createBooking({
              owner: createdUser,
              totalPrice: room.pricePerDay * countRangeDates(dateRange),
              dateRange,
              room,
            }).pipe(
              map(booking => ({ bookingId: booking.id }))
            )))
          )
        )
      })
    )
  }

  getRooms(data: GetRoomsDto): Observable<PaginatedRoomResponseDto> {
    const { from, to, pricePerDay, size, offset } = data;
    const priceOrder = RoomService.getPriceOrder(pricePerDay);
    if (from && to) {
      return this.bookingService.getBookedRooms({ from, to }, priceOrder).pipe(
        mergeMap(closedRoomIds => this.repositoryService.getAvailableRooms(
          closedRoomIds.map(item => item.room.id),
          size,
          offset,
        )),
      );
    }
    return this.repositoryService.searchRooms(priceOrder, offset, size);
  }
  
  private static getPriceOrder(pricePerDay?: PricePerDaySorting): { pricePerDay: PricePerDaySorting } {
    return {
      pricePerDay: pricePerDay
        ? pricePerDay
        : PricePerDaySorting.DESC,
    };
  }
}
