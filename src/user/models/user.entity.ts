import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';
import { Booking } from '../../booking/models/booking.entity';

@Entity()
export class User {
  @PrimaryColumn('varchar')
  id: string;

  @Column({ unique: true })
  firstName: string;

  @OneToMany(() => Booking, booking => booking.ownerId )
  booking: Booking[];
}
