import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Hotel } from '../../hotel/models/hotel.entity';

@Entity()
export class Room {
  @PrimaryColumn('varchar')
  id: string;

  @ManyToOne(() => Hotel, { nullable: false, onDelete: 'CASCADE' })
  hotelId: string;

  @Column('float')
  pricePerDay: number;

  //  @Type(() => RoomType)
  @Column()
  roomType: string;
}
