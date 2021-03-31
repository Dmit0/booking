import { registerAs } from '@nestjs/config';
import { Booking } from '../core/entities/booking.entity';
import { Room } from '../core/entities/room.entity';
import { User } from '../core/entities/user.entity';

export default registerAs('db', () => ({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [
    Booking,
    User,
    Room
  ],
  synchronize: true,
  logging: ["error"]
}));