import { Module } from '@nestjs/common';
import { ChatsService } from '@/chats/chats.service';
import { ChatsController } from '@/chats/chats.controller';
import { AuthModule } from '@/auth/auth.module';
import { QueriesModule } from '@/queries/queries.module';
import { ChatQuery } from '@/queries/utils/chatQuery';
import { MessageQuery } from '@/queries/utils/messageQuery';

@Module({
  imports     : [AuthModule, QueriesModule],
  controllers : [ChatsController],
  providers   : [ChatsService, ChatQuery, MessageQuery],
  exports     : [ChatsService],
})
export class ChatsModule {}
