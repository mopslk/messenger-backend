import { Expose, Transform } from 'class-transformer';
import { MessageAttachments } from '@prisma/client';
import { decrypt } from '@/utils/helpers/encrypt';

export class MessageResponseDto {
  @Expose()
  @Transform(({ value }) => value.toString())
    id: string;

  @Expose()
    content: string;

  @Expose()
    attachments?: Omit<MessageAttachments, 'message_id'>[] | [];

  @Expose({ name: 'created_at' })
    createdAt: string;

  @Expose({ name: 'updated_at' })
    updatedAt: string;

  static async from(data: any) {
    return Object.assign(data, {
      content: data.content ? await decrypt(data.content) : '',
    });
  }
}
