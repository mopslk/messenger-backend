import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@/auth/utils/auth.guard';
import { UniqueConstraint } from '@/utils/decorators/unique.decorator';
import { PrismaModule } from '@/prisma/prisma.module';
import { AuthModule } from '@/auth/auth.module';
import { UsersModule } from '@/users/users.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisConfig } from '@/utils/helpers/storageConfigs';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PrismaModule,
    CacheModule.registerAsync(redisConfig),
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
