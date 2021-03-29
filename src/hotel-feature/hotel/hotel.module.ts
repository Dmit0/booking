import { Module } from '@nestjs/common';
import { HotelController } from './hotel.controller';
import { HotelRepositoryService } from './hotel.repository.service';
import { HotelService } from './hotel.service';

@Module({
  controllers: [HotelController],
  providers: [HotelService, HotelRepositoryService],
})
export class HotelModule {}
