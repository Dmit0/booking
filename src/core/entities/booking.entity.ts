import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Room } from './room.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { nullable: false, onDelete: 'RESTRICT' })
  // @JoinColumn({ name: 'ownerId' })
  owner: User;

  @ManyToOne(() => Room, { nullable: false, onDelete: 'RESTRICT' })
  // @JoinColumn({ name: 'roomId' })
  room: Room;

  @Column({ type: 'timestamptz' })
  start: Date;

  @Column({ type: 'timestamptz' })
  end: Date;

  @Column('float')
  totalPrice: number;
}
