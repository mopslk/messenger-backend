import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from '@/auth/utils/auth.guard';
import { UniqueConstraint } from '@/utils/decorators/unique.decorator';
import {PrismaModule} from "@/prisma/prisma.module";

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PrismaModule,
  ],
  controllers : [],
  providers   : [
    {
      provide  : APP_GUARD,
      useClass : AuthGuard,
    },
    UniqueConstraint,
  ],
})
export class AppModule {}
