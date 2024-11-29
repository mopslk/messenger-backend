import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '@/auth/services/auth.service';
import { UsersModule } from '@/users/users.module';
import { AuthController } from '@/auth/controllers/auth.controller';

@Module({
  imports: [
    PassportModule,
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
