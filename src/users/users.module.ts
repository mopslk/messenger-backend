import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@/users/services/user.service';
import { User } from '@/users/entity/user';
import { UserController } from '@/users/controllers/user.controller';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports     : [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  controllers : [UserController],
  providers   : [UserService],
  exports     : [UserService],
})
export class UsersModule {}
