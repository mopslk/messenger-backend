import { Transform } from 'class-transformer';
import type { ChatMembersType } from '@/utils/types';
import type { ChatType, Message } from '@prisma/client';

export class ChatResponseDto {
  @Transform(({ value }) => value.toString())
    id: string;

  type: ChatType;

  name: string | null;

  created_at: string;

  last_message: Pick<Message, 'content' | 'created_at'>;

  @Transform(({ value }) => value.map(({ user, role }) => ({
    ...user,
    role,
  })), { toPlainOnly: true }) // Убираем лишние поля оставляя только `user` и `role`
    members: ChatMembersType[];
}
