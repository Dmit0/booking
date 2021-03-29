import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class BookingGuests {
  @PrimaryColumn('varchar')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;
}