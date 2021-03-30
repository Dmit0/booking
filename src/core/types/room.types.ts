import { RoomType } from '../enums/room-type.enum';

export interface IRoom {
  pricePerDay: number;
  roomType: RoomType;
  number: string,
  name: string
}

export interface IRoomClosedResponse {
  room_id: string
}

export interface IGetCloseRoomsOptions {
  from: Date,
  to: Date,
  size?: number,
  offset?: number
}