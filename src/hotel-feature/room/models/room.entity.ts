import { Entity, Column, PrimaryColumn } from 'typeorm';
import { RoomType } from '../../../core/enums/room-type.enum';

@Entity()
export class Room {
  @PrimaryColumn('varchar')
  id: string;

  @Column('float')
  pricePerDay: number;

  @Column('enum', { enum: RoomType })
  roomType: RoomType;
}
