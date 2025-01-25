import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { UniqueConstraint } from '@/utils/decorators/unique.decorator';
import { PrismaModule } from '@/prisma/prisma.module';
import { AuthModule } from '@/auth/auth.module';
import { UsersModule } from '@/users/users.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisConfig } from '@/utils/helpers/storageConfigs';
import { MulterModule } from '@nestjs/platform-express';
import { ChatsModule } from '@/chats/chats.module';
import { MessagesModule } from '@/messages/messages.module';
import { FilesModule } from '@/files/files.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PrismaModule,
    CacheModule.registerAsync(redisConfig),
    ChatsModule,
    MulterModule.register({
      dest: process.env.BASE_FILES_PATH,
    }),
    MessagesModule,
    FilesModule,
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
