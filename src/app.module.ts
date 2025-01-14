import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@/auth/utils/auth.guard';
import { UniqueConstraint } from '@/utils/decorators/unique.decorator';
import { PrismaModule } from '@/prisma/prisma.module';
import { AuthModule } from '@/auth/auth.module';
import { UsersModule } from '@/users/users.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisConfig } from '@/utils/helpers/storageConfigs';
import { ChatsModule } from './chats/chats.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PrismaModule,
    CacheModule.registerAsync(redisConfig),
    ChatsModule,
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
