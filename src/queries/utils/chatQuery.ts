import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ChatType } from '@prisma/client';
import type { ChatMembersCreateInput } from '@/utils/types';
import { UpdateChatDto } from '@/chats/dto/update-chat.dto';

@Injectable()
export class ChatQuery {
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
          include: {
            attachments: {
              select: {
                path : true,
                type : true,
              },
            },
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

  async getChatMembers(chatId: bigint) {
    return this.prisma.chatMember.findMany({
      where: {
        chat_id: chatId,
      },
    });
  }
}
