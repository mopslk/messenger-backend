import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import type { MessageCreateInput, MessageUpdateInput } from '@/utils/types';
import { MessageAttachments } from '@prisma/client';
import { encrypt } from '@/utils/helpers/encrypt';

@Injectable()
export class MessageQuery {
  constructor(private prisma: PrismaService) {}

  async createMessage(messageCreateInput: MessageCreateInput) {
    const { content,  ...messageData } = messageCreateInput.message;

    const encryptedContent = await encrypt(content);

    const message = await this.prisma.message.create({
      data: {
        content: encryptedContent,
        ...messageData,
      },
    });

    if (!message) {
      throw new InternalServerErrorException('Failed to create messages');
    }

    if (messageCreateInput.attachments.length) {
      await this.prisma.messageAttachments.createMany({
        data: messageCreateInput.attachments.reduce<MessageAttachments[]>((acc, attachment) => ([
          ...acc,
          {
            ...attachment,
            message_id: message.id,
          },
        ]), []),
      });
    }

    const attachments = messageCreateInput.attachments.length
      ? await this.getMessageAttachments(message.id)
      : [];

    return Object.assign(message, { attachments });
  }

  async getMessageAttachments(messageId: bigint): Promise<Omit<MessageAttachments, 'message_id'>[]> {
    return this.prisma.messageAttachments.findMany({
      where: {
        message_id: messageId,
      },
      select: {
        type : true,
        path : true,
      },
    });
  }

  async updateMessage(messageUpdateInput: MessageUpdateInput) {
    const encryptedMessage = await encrypt(messageUpdateInput.content);

    return this.prisma.message.update({
      where: {
        id: messageUpdateInput.message_id,
      },
      data: {
        content: encryptedMessage,
      },
    });
  }

  async checkUserAccessToMessage(userId: bigint, messageId: bigint) {
    const messageRow = await this.prisma.message.findFirst({
      where: {
        user_id : userId,
        id      : messageId,
      },
    });

    return messageRow !== null;
  }

  async deleteMessage(messageId: bigint) {
    return this.prisma.message.delete({
      where: {
        id: messageId,
      },
    });
  }
}
