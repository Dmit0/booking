import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DateRangeDto } from '../core/dto';
import { IBooking, IBookingCreate, IPricePerDay, IDateRange } from '../core/types';
import { BookingRepositoryService } from './booking.repository.service';


@Injectable()
export class BookingService {
  constructor(private readonly repositoryService: BookingRepositoryService) {}

  createBooking(data: IBookingCreate & { dateRange: IDateRange} ): Observable<IBooking> {
    const { dateRange, ...options } = data;
    return this.repositoryService.createBooking({
      ...options,
      end: dateRange.to,
      start: dateRange.from
    });
  }

  getBookedRooms(options: DateRangeDto, priceOrder: IPricePerDay): Observable<IBooking[]> {
    return this.repositoryService.findBookings(options, priceOrder)
  }

  checkRoomIsReserved(roomId: string, dateRange: DateRangeDto): Observable<boolean> {
    return this.repositoryService.findBookings(dateRange).pipe(
      map(closedRooms => {
          return !!closedRooms.find(item => item.room.id === roomId);
      }),
    );
  }
}
