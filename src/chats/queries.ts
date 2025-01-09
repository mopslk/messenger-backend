import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

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
}
