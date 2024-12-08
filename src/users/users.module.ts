// eslint-disable-next-line import/no-cycle
import { AuthModule } from '@/auth/auth.module';
import { forwardRef, Module } from '@nestjs/common';
import { UserService } from '@/users/services/user.service';
import { UserController } from '@/users/controllers/user.controller';

@Module({
  imports     : [forwardRef(() => AuthModule)],
  controllers : [UserController],
  providers   : [UserService],
  exports     : [UserService],
})
export class UsersModule {}
