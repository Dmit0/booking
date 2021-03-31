import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Connection } from 'typeorm';
import { Room } from '../core/entities';
import { IPaginatedRooms } from '../core/types';
import { RoomCreateDto } from './dto';

@Injectable()
export class RoomRepositoryService {
  constructor(private readonly connection: Connection) {
  }

  createRoom(room: RoomCreateDto): Observable<Room> {
    return from(this.connection.getRepository(Room).save(room)).pipe(
      mergeMap(() => this.findOne({ name: room.name })),
    );
  }

  findOne(payload: Partial<Room>): Observable<Room> {
    return from(this.connection.getRepository(Room).findOne(payload));
  }

  searchRooms(order, offset?: number, size?: number): Observable<IPaginatedRooms<Room>> {
    return from(this.connection.getRepository(Room).findAndCount({
      skip: offset || 0,
      take: size || 5,
      order
    })).pipe(
      map(([rooms, total]) => ({
        rooms,
        total
      }))
    );
  }

  getAvailableRooms(ids: string[], size: number, offset: number ): Observable<IPaginatedRooms<Room>> {
    const query = this.connection.getRepository(Room).createQueryBuilder('room')
      .take(size || 5)
      .skip(offset || 0)
    if (ids.length) {
      query.where('room.id NOT IN (:...ids)', { ids })
    }
    return from(query.getManyAndCount()).pipe(
      map(([rooms, total]) => ({
        total,
        rooms
      }))
    )
  }
}
