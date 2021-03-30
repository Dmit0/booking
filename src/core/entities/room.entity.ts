import { Entity, Column, Generated, PrimaryGeneratedColumn } from 'typeorm';
import { RoomType } from '../enums/room-type.enum';

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { unique: true })
  name: string;

  @Generated('increment')
  @Column({ unique: true })
  number: number;

  @Column('int')
  pricePerDay: number;

  @Column('enum', { enum: RoomType })
  roomType: RoomType;
}
