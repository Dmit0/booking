import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { BookingModule } from '../booking';
import { UserModule } from '../user';
import { RoomController } from './room.controller';
import { RoomRepositoryService } from './room.repository.service';
import { RoomService } from './room.service';

@Module({
  imports: [UserModule, BookingModule],
  providers: [
    RoomRepositoryService,
    RoomService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
  controllers: [RoomController]
})
export class RoomModule {}
