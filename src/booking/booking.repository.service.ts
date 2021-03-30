import { Injectable } from '@nestjs/common';
import { from as _from, Observable } from 'rxjs';
import { Connection, SelectQueryBuilder } from 'typeorm';
import { Booking } from '../core/entities/booking.entity';

@Injectable()
export class BookingRepositoryService {
  constructor(private readonly connection: Connection) {}

  reservationCreate(data: any) {
    return _from(this.connection.getRepository(Booking).save(data));
  }

  private addRelations<T>(relations: string[], expression: SelectQueryBuilder<T>): void {
    relations.forEach(key => {
      expression.leftJoinAndSelect(`booking.${key}`, key);
    });
  }

  closedRoomsIds(options: any, priceOrder: any): Observable<any> {
    const { from, to } = options;
    const query = this.connection.getRepository(Booking).createQueryBuilder('booking');
    this.addRelations([ 'room' ], query);
    return _from(query
      .select('room.id')
      .where(`booking.start >= '${ new Date(from).toUTCString() }' AND booking.end <= '${ new Date(to).toUTCString() }'`)
      .orderBy('room.pricePerDay', priceOrder.pricePerDay)
      .getRawMany());
    // .limit(options.size || 5)
    // .skip(options.offset || 0)
  }
}
