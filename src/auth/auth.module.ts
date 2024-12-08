// eslint-disable-next-line import/no-cycle
import { UsersModule } from '@/users/users.module';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '@/auth/services/auth.service';
import { AuthController } from '@/auth/controllers/auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
    }),
    forwardRef(() => UsersModule),
  ],
  controllers : [AuthController],
  providers   : [AuthService],
  exports     : [
    AuthService,
    JwtModule,
  ],
})
export class AuthModule {}
