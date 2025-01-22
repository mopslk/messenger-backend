import { Expose, Transform } from 'class-transformer';
import type { ChatMembersType } from '@/utils/types';
import type { ChatType, Message } from '@prisma/client';
import { decrypt } from '@/utils/helpers/encrypt';

export class ChatResponseDto {
  @Transform(({ value }) => value.toString())
    id: string;

  type: ChatType;

  name: string | null;

  @Expose({ name: 'created_at' })
    createdAt: string;

  @Transform(({ value }) => value.map(({ user, role }) => ({
    ...user,
    role,
  })), { toPlainOnly: true }) // Убираем лишние поля оставляя только `user` и `role`
    members: ChatMembersType[];

  @Expose()
    messages: Omit<Message, 'chat_id' | 'user_id'>[];

  static async from(data: any) {
    const messages = await Promise.all(data.messages.map(async (message) => ({
      id          : message.id.toString(),
      content     : await decrypt(message.content),
      created_at  : message.created_at,
      updated_at  : message.updated_at,
      attachments : message.attachments,
    })));

    return Object.assign(data, {
      messages,
    });
  }
}
