import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { DateRangeDto } from '../core/dto/range.dto';
import { IBooking, IBookingCreate } from '../core/types/booking.type';
import { IPricePerDay } from '../core/types/filter.types';
import { IDateRange } from '../core/types/range.types';
import { IGetCloseRoomsOptions, IRoomClosedResponse } from '../core/types/room.types';
import { BookingRepositoryService } from './booking.repository.service';


@Injectable()
export class BookingService {
  constructor(private readonly repositoryService: BookingRepositoryService,) {}

  reservation(data: IBookingCreate & { dateRange: IDateRange} ): Observable<IBooking> {
    const { dateRange, ...options } = data;
    return this.repositoryService.reservationCreate({
      ...options,
      end: dateRange.to,
      start: dateRange.from
    });
  }

  getCloseRooms(options: IGetCloseRoomsOptions, priceOrder: IPricePerDay): Observable<IRoomClosedResponse[] | IRoomClosedResponse> {
    return this.repositoryService.closedRoomsIds(options, priceOrder)
  }

  checkIsRoomReserved(roomId: string, dateRange: DateRangeDto): Observable<boolean> {
    return this.repositoryService.closedRoomsIds(dateRange).pipe(
      mergeMap(closedRooms => {
        if (Array.isArray(closedRooms)) {
          return of(!!closedRooms.find(item => item.room_id === roomId));
        }
        return of(closedRooms.room_id === roomId);
      }),
    );
  }
}
