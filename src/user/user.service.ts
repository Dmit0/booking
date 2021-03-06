import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { User } from '../core/entities';
import { UserDto } from './dto';
import { UserRepositoryService } from './user.repository.service';

@Injectable()
export class UserService {
  constructor(private readonly repositoryService: UserRepositoryService) {}

  createUser(userData: UserDto): Observable<User> {
    return this.repositoryService.findOne({ email: userData.email }).pipe(
      mergeMap(user => {
        if (user) return of(user);
        return this.repositoryService.createUser(userData);
      })
    )
  }
}
