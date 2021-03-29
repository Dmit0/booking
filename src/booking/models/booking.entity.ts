import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Booking {
  @PrimaryColumn('varchar')
  id: string;

  @Column()
  ownerId: string;

  @Column()
  roomId: string;

  @Column({ type: 'date' })
  start: Date;

  @Column({ type: 'date' })
  end: Date;

  @Column('float')
  totalPrice: number;
}