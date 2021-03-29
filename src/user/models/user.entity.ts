import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { BookingGuests } from '../../booking/models/booking.guests';
import { Booking } from '../../booking/models/booking.entity';

@Entity()
export class User {
  @PrimaryColumn('varchar')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @ManyToOne(() => BookingGuests, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn()
  bookingGuest: BookingGuests;

  @OneToMany(() => Booking, { nullable: false, onDelete: 'CASCADE' })
  booking: Booking;
}
