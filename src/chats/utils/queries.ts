import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ChatType, type MessageAttachments } from '@prisma/client';
import type { ChatMembersCreateInput, MessageCreateInput } from '@/utils/types';
import { UpdateChatDto } from '@/chats/dto/update-chat.dto';

@Injectable()
export default class Query {
  constructor(
    private prisma: PrismaService,
  ) {}

  async getUserChats(userId: bigint) {
    return this.prisma.chatMember.findMany({
      where: {
        user_id: userId,
      },
      include: {
        chat: {
          select: {
            id           : true,
            type         : true,
            name         : true,
            created_at   : true,
            last_message : {
              select: {
                content    : true,
                created_at : true,
              },
            },
            members: {
              include: {
                user: {
                  select: {
                    login  : true,
                    name   : true,
                    avatar : true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        chat: {
          updated_at: 'desc',
        },
      },
    });
  }

  async createChat(type: ChatType, name?: string) {
    return this.prisma.chat.create({
      data: {
        name,
        type,
      },
    });
  }

  async getChat(id: bigint) {
    return this.prisma.chat.findUnique({
      where: {
        id,
      },
      select: {
        id       : true,
        name     : true,
        type     : true,
        messages : {
          select: {
            id         : true,
            content    : true,
            created_at : true,
            updated_at : true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                login  : true,
                name   : true,
                avatar : true,
              },
            },
          },
        },
      },
    });
  }

  async updateChat(id: bigint, UpdateChatDto: UpdateChatDto, messageId?: bigint) {
    const { name } = UpdateChatDto;

    return this.prisma.chat.update({
      where: {
        id,
      },
      data: {
        name,
        last_message_id: messageId ?? undefined,
      },
      select: {
        id       : true,
        name     : true,
        type     : true,
        messages : {
          select: {
            id         : true,
            content    : true,
            created_at : true,
            updated_at : true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                login  : true,
                name   : true,
                avatar : true,
              },
            },
          },
        },
      },
    });
  }

  async addMembersToChat(members: ChatMembersCreateInput[]) {
    return this.prisma.chatMember.createMany({
      data: members,
    });
  }

  async createMessage(messageCreateInput: MessageCreateInput) {
    const message = await this.prisma.message.create({
      data: messageCreateInput.message,
    });

    if (!message) {
      throw new InternalServerErrorException('Failed to create messages');
    }

    if (messageCreateInput.attachments.length) {
      this.prisma.messageAttachments.createMany({
        data: messageCreateInput.attachments.reduce<MessageAttachments[]>((acc, attachment) => ([
          ...acc,
          {
            ...attachment,
            message_id: message.id,
          },
        ]), []),
      });
    }

    return message;
  }

  async getUserAccessInChat(userId: bigint, chatId: bigint) {
    return this.prisma.chatMember.findFirst({
      where: {
        user_id : userId,
        chat_id : chatId,
      },
    });
  }

  async removeChat(chatId: bigint) {
    return this.prisma.chat.delete({
      where: {
        id: chatId,
      },
    });
  }
}
