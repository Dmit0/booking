import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { Connection } from 'typeorm';
import { User } from '../core/entities';
import { UserDto } from './dto';

@Injectable()
export class UserRepositoryService {
  constructor(private readonly connection: Connection) {}

  findOne(payload: Partial<User>): Observable<User> {
    return from(this.connection.getRepository(User).findOne(payload));
  }

  createUser(user: UserDto): Observable<User> {
    return from(this.connection.getRepository(User).save(user));
  }
}
