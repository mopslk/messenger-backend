// eslint-disable-next-line import/no-cycle
import { ChatsModule } from '@/chats/chats.module';
import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '@/auth/auth.module';
import { QueriesModule } from '@/queries/queries.module';
import { MessageQuery } from '@/queries/utils/messageQuery';
import { ChatQuery } from '@/queries/utils/chatQuery';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';

@Module({
  imports: [
    AuthModule,
    forwardRef(() => ChatsModule),
    QueriesModule,
  ],
  controllers : [MessagesController],
  providers   : [MessagesService, MessageQuery, ChatQuery],
  exports     : [MessagesService],
})
export class MessagesModule {}
