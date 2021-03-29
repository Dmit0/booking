import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Room {
  @PrimaryColumn('varchar')
  id: string;

  @Column()
  hotelId: string;

  @Column('float')
  pricePerDay: number;

  //  @Type(() => RoomType)
  @Column()
  roomType: string;
}
