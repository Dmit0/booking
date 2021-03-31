import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Connection } from 'typeorm';
import { RoomCreateDto } from './dto/room.dto';
import { Room } from '../core/entities/room.entity';
import { PaginatedRoomResponseDto, RoomCreateResponseDto } from './dto/room.response';

@Injectable()
export class RoomRepositoryService {
  constructor(private readonly connection: Connection) {
  }

  createRoom(room: RoomCreateDto): Observable<RoomCreateResponseDto> {
    return from(this.connection.getRepository(Room).save(room)).pipe(
      mergeMap(() => this.findOne({ name: room.name }).pipe(
        map(room => ({ roomId: room.id }))
        ),
      ),
    );
  }

  findOne(payload: Partial<Room>): Observable<Room> {
    return from(this.connection.getRepository(Room).findOne(payload)).pipe(
      map((room) => room || null),
    );
  }

  filterRooms(order, offset?: number, size?: number): Observable<PaginatedRoomResponseDto> {
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

  getOpenedRooms(ids: string[], size: number, offset: number ): Observable<PaginatedRoomResponseDto> {
    const query = this.connection.getRepository(Room).createQueryBuilder('room')
    if (ids.length) {
      query.where('room.id NOT IN (:...ids)', { ids })
        .limit(size || 5)
        .skip(offset || 0)
    }
    return from(query.getManyAndCount()).pipe(
      map(([rooms, total]) => ({
        total,
        rooms
      }))
    )
  }
}
