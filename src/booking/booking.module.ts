import { Module } from '@nestjs/common';
import { BookingRepositoryService } from './booking.repository.service';
import { BookingService } from './booking.service';

@Module({
  providers: [BookingRepositoryService, BookingService],
  exports: [BookingService],
})
export class BookingModule {}
