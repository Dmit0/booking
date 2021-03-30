import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DateRangeDto } from '../core/dto/range.dto';
import { BookingRepositoryService } from './booking.repository.service';


@Injectable()
export class BookingService {
  constructor(private readonly repositoryService: BookingRepositoryService,) {}

  reservation(data: { userId: string, dateRange: DateRangeDto, roomId: string }): Observable<any> {
    return this.repositoryService.reservationCreate(data)
  }
}
