import { registerAs } from '@nestjs/config';
import { Booking, Room, User } from '../core/entities';

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