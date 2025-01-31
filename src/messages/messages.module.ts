import { ChatsModule } from '@/chats/chats.module';
import { Module } from '@nestjs/common';
import { AuthModule } from '@/auth/auth.module';
import { QueriesModule } from '@/queries/queries.module';
import { MessageQuery } from '@/queries/utils/messageQuery';
import { ChatQuery } from '@/queries/utils/chatQuery';
import { NotificationsModule } from '@/notifications/notifications.module';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';

@Module({
  imports: [
    AuthModule,
    ChatsModule,
    QueriesModule,
    NotificationsModule,
  ],
  controllers : [MessagesController],
  providers   : [MessagesService, MessageQuery, ChatQuery],
  exports     : [MessagesService],
})
export class MessagesModule {}
