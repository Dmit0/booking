import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DateRangeDto } from '../core/dto/range.dto';
import { BookingRepositoryService } from './booking.repository.service';
import { BookingDto } from './dto/booking.dto';


@Injectable()
export class BookingService {
  constructor(private readonly repositoryService: BookingRepositoryService,) {}

  reservation(data: BookingDto): Observable<any> {
    const { dateRange, ...options } = data;
    return this.repositoryService.reservationCreate({
      ...options,
      end: dateRange.to,
      start: dateRange.from
    });
  }
  
  getEmptyRooms(data: any) {
    return this.repositoryService.getFilteredEmptyRooms(data)
  }
}
