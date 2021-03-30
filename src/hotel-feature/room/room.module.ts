import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '../../core/pipes/validation.pipe';
import { RoomController } from './room.controller';
import { RoomRepositoryService } from './room.repository.service';
import { RoomService } from './room.service';

@Module({
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
