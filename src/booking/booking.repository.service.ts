import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { Connection } from 'typeorm';
import { DateRangeDto } from '../core/dto/range.dto';
import { Booking } from '../core/entities/booking.entity';

@Injectable()
export class BookingRepositoryService {
  constructor(private readonly connection: Connection) {}

  reservationCreate(data: { userId: string, dateRange: DateRangeDto, roomId: string }) {
    return from(this.connection.getRepository(Booking).save({

    }))
  }
}
