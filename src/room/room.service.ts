import { Injectable, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { BookingService } from '../booking/booking.service';
import { ErrorMessage } from '../core/enums/errors.enum';
import { UserTypeDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { RoomCreateDto, RoomReservationDto } from './dto/room.dto';
import { RoomCreateResponseDto } from './dto/room.response';
import { RoomRepositoryService } from './room.repository.service';

@Injectable()
export class RoomService {
  constructor(private readonly repositoryService: RoomRepositoryService,
              private readonly userService: UserService,
              private readonly bookingService: BookingService,
  ) {
  }

  createRoom(data: RoomCreateDto): Observable<RoomCreateResponseDto> {
    return this.repositoryService.findOne({ name: data.name }).pipe(
      mergeMap(response => {
        if (response) throw new NotFoundException(ErrorMessage.ROOM_IS_EXIST)
        return this.repositoryService.createRoom(data);
      })
    );
  }

  reserveRoom(roomId: string, data: RoomReservationDto) {
    const { user, dateRange } = data
    return this.repositoryService.findOne({ id: roomId }).pipe(
      mergeMap(room => {
        if (!room) throw new NotFoundException(ErrorMessage.ROOM_NOT_FOUND)
        return this.userService.createUser(user).pipe(
          mergeMap(createdUser => this.bookingService.reservation({
            userId: createdUser.id,
            dateRange,
            roomId
          }))
        )
      })
    )
  }
}
