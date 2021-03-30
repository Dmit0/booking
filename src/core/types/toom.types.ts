import { RoomType } from '../enums/room-type.enum';

export interface Room {
  pricePerDay: number,
  roomType: RoomType
}