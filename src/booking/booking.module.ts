import { Module } from '@nestjs/common';
import { BookingRepositoryService } from './booking.repository.service';
import { BookingService } from './booking.service';

@Module({
  providers: [BookingRepositoryService, BookingService],
})
export class BookingModule {}
