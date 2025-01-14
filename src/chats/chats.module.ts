import { Module } from '@nestjs/common';
import { ChatsService } from '@/chats/chats.service';
import { ChatsController } from '@/chats/chats.controller';
import Query from '@/chats/utils/queries';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports     : [AuthModule],
  controllers : [ChatsController],
  providers   : [ChatsService, Query],
})
export class ChatsModule {}
