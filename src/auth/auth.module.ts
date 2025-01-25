import { UsersModule } from '@/users/users.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '@/auth/auth.service';
import { AuthController } from '@/auth/auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
    }),
    UsersModule,
  ],
  controllers : [AuthController],
  providers   : [AuthService],
  exports     : [
    JwtModule,
  ],
})
export class AuthModule {}
