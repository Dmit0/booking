import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BookingRepositoryService } from './booking.repository.service';


@Injectable()
export class BookingService {
  constructor(private readonly repositoryService: BookingRepositoryService,) {}

  reservation(data: any): Observable<any> {
    const { dateRange, ...options } = data;
    return this.repositoryService.reservationCreate({
      ...options,
      end: dateRange.to,
      start: dateRange.from
    });
  }

  getCloseRooms(options: any, priceOrder: any): Observable<any> {
    return this.repositoryService.closedRoomsIds(options, priceOrder).pipe(
      tap(console.log),
    )
  }
}
