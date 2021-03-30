import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './dataBase/database.module';
import { RoomModule } from './hotel-feature/room/room.module';
import { UserModule } from './user/user.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    UserModule,
    BookingModule,
    RoomModule,
  ],
})
export class AppModule {}
