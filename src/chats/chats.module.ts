import { Module } from '@nestjs/common';
import { ChatsService } from '@/chats/chats.service';
import { ChatsController } from '@/chats/chats.controller';
import Query from '@/chats/queries';

@Module({
  controllers : [ChatsController],
  providers   : [ChatsService, Query],
})
export class ChatsModule {}
