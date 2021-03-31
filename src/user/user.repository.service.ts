import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Connection } from 'typeorm';
import { User } from '../core/entities/user.entity';
import { UserTypeDto } from './dto/user.dto';

@Injectable()
export class UserRepositoryService {
  constructor(private readonly connection: Connection) {}

  findOne(payload: Partial<User>): Observable<User> {
    return from(this.connection.getRepository(User).findOne(payload)).pipe(
      map((user) => user || null),
    );
  }

  createUser(user: UserTypeDto): Observable<User> {
    return from(this.connection.getRepository(User).save(user));
  }
}
