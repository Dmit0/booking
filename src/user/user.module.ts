import { Module } from '@nestjs/common';
import { UserRepositoryService } from './user.repository.service';
import { UserService } from './user.service';

@Module({
  providers: [UserService, UserRepositoryService],
  exports:[UserService]
})
export class UserModule {}
