import { Injectable } from '@nestjs/common';
import { from as _from, Observable } from 'rxjs';
import { Connection, SelectQueryBuilder } from 'typeorm';
import { DateRangeDto } from '../core/dto';
import { Booking } from '../core/entities';
import { IBooking, IPricePerDay } from '../core/types';

@Injectable()
export class BookingRepositoryService {
  constructor(private readonly connection: Connection) {}

  createBooking(options: IBooking): Observable<Booking> {
    return _from(this.connection.getRepository(Booking).save(options));
  }

  private addRelations<T>(relations: string[], expression: SelectQueryBuilder<T>): void {
    relations.forEach(key => {
      expression.leftJoinAndSelect(`booking.${key}`, key);
    });
  }

  findBookings(options: DateRangeDto, priceOrder?: IPricePerDay): Observable<Booking[]> {
    const { from, to } = options;
    const query = this.connection.getRepository(Booking).createQueryBuilder('booking');
    this.addRelations([ 'room' ], query);
    query
      .where(`booking.start >= '${ new Date(from).toUTCString() }' AND booking.end <= '${ new Date(to).toUTCString() }'`)
      .orderBy('room.pricePerDay', priceOrder?.pricePerDay || 'DESC')
    return _from(query.getMany());
  }
}
