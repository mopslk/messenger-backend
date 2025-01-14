import { Transform } from 'class-transformer';
import type { ChatMembersType } from '@/utils/types';
import type { ChatType, Message } from '@prisma/client';

export class ChatResponseDto {
  @Transform(({ value }) => value.toString())
    id: string;

  type: ChatType;

  name: string | null;

  created_at: string;

  @Transform(({ value }) => value.map(({ user, role }) => ({
    ...user,
    role,
  })), { toPlainOnly: true }) // Убираем лишние поля оставляя только `user` и `role`
    members: ChatMembersType[];

  @Transform(({ value }) => value.map((message) => ({
    ...message,
    id: message.id.toString(),
  })), { toPlainOnly: true })
    messages: Omit<Message, 'chat_id' | 'user_id'>[];
}
