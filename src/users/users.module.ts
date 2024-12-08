import { forwardRef, Module } from '@nestjs/common';
import { UserService } from '@/users/services/user.service';
import { UserController } from '@/users/controllers/user.controller';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports     : [forwardRef(() => AuthModule)],
  controllers : [UserController],
  providers   : [UserService],
  exports     : [UserService],
})
export class UsersModule {}
