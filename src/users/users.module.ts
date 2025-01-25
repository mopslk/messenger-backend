import { Module } from '@nestjs/common';
import { UserService } from '@/users/user.service';
import { UserController } from '@/users/user.controller';
import { QueriesModule } from '@/queries/queries.module';
import { UserQuery } from '@/queries/utils/userQuery';

@Module({
  imports     : [QueriesModule],
  controllers : [UserController],
  providers   : [UserService, UserQuery],
  exports     : [UserService],
})
export class UsersModule {}
