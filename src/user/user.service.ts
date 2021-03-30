import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { User } from '../core/entities/user.entity';
import { RoomRepositoryService } from '../room/room.repository.service';
import { UserTypeDto } from './dto/user.dto';
import { UserRepositoryService } from './user.repository.service';

@Injectable()
export class UserService {
  constructor(private readonly repositoryService: UserRepositoryService) {}

  createUser(user: UserTypeDto): Observable<User> {
    return this.repositoryService.findOne({ email: user.email }).pipe(
      mergeMap(user => {
        if (user) return of(user);
        return this.repositoryService.createUser(user);
      })
    )
  }
}
