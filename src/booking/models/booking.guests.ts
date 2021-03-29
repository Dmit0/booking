import { Entity, PrimaryColumn, OneToOne, OneToMany } from 'typeorm';
import { User } from '../../user/models/user.entity';
import { Booking } from './booking.entity';

@Entity()
export class BookingGuests {
  @PrimaryColumn('varchar')
  id: string;

  @OneToOne(() => Booking, { nullable: false, onDelete: 'CASCADE' })
  bookingId: string;

  @OneToMany(() => User, (user) => user.id, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  userIds: User[];
}
