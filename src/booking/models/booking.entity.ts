import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/models/user.entity';
import { Room } from '../../hotel-feature/room/models/room.entity';

@Entity()
export class Booking {
  @PrimaryColumn('varchar')
  id: string;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn()
  ownerId: string;

  @ManyToOne(() => Room, { nullable: false, onDelete: 'RESTRICT' })
  roomId: string;

  @Column({ type: 'date' })
  start: Date;

  @Column({ type: 'date' })
  end: Date;

  @Column('float')
  totalPrice: number;
}
