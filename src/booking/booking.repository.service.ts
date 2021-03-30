import { Injectable } from '@nestjs/common';
import { from as _from, Observable } from 'rxjs';
import { Connection, SelectQueryBuilder } from 'typeorm';
import { DateRangeDto } from '../core/dto/range.dto';
import { Booking } from '../core/entities/booking.entity';
import { IBooking } from '../core/types/booking.type';
import { IPricePerDay } from '../core/types/filter.types';
import { IRoomClosedResponse } from '../core/types/room.types';

@Injectable()
export class BookingRepositoryService {
  constructor(private readonly connection: Connection) {}

  reservationCreate(options: IBooking): Observable<IBooking> {
    return _from(this.connection.getRepository(Booking).save(options));
  }

  private addRelations<T>(relations: string[], expression: SelectQueryBuilder<T>): void {
    relations.forEach(key => {
      expression.leftJoinAndSelect(`booking.${key}`, key);
    });
  }

  closedRoomsIds(options: DateRangeDto, priceOrder?: IPricePerDay): Observable<IRoomClosedResponse[] | IRoomClosedResponse> {
    const { from, to } = options;
    const query = this.connection.getRepository(Booking).createQueryBuilder('booking');
    this.addRelations([ 'room' ], query);
    query
      .select('room.id')
      .where(`booking.start >= '${ new Date(from).toUTCString() }' AND booking.end <= '${ new Date(to).toUTCString() }'`)
      .orderBy('room.pricePerDay', priceOrder?.pricePerDay || 'DESC')
    return _from(query.getRawMany());
  }
}
