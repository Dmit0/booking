import { Room } from '../entities';
import { User } from '../entities';

export interface IBooking {
  id?: string;
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