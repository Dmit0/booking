import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Room } from '../../room/models/room.entity';

@Entity()
export class Hotel {
  @PrimaryColumn('varchar')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Room, (room) => room.id, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  rooms: Room[];
}
