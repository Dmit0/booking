import { Room } from '../entities/room.entity';
import { User } from '../entities/user.entity';

export interface IBooking {
  id?: string
  owner: User;
  room: Room;
  start: Date;
  end: Date;
  totalPrice: number;
}

export interface IBookingCreate {
  totalPrice: number;
  owner: User;
  room: Room;
}