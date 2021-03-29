import { Module } from '@nestjs/common';
import { RoomRepositoryService } from './room.repository.service';
import { RoomService } from './room.service';

@Module({
  providers: [RoomRepositoryService, RoomService],
})
export class RoomModule {}
