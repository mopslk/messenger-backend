import { Module } from '@nestjs/common';
import { MessageQuery } from '@/queries/utils/messageQuery';
import { ChatQuery } from '@/queries/utils/chatQuery';

@Module({
  providers: [MessageQuery, ChatQuery],
})
export class QueriesModule {}
