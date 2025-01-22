import {
  Injectable, InternalServerErrorException, UnauthorizedException,
} from '@nestjs/common';
import { CreateChatDto } from '@/chats/dto/create-chat.dto';
import { UpdateChatDto } from '@/chats/dto/update-chat.dto';
import { ChatQuery as Query } from '@/queries/utils/chatQuery';
import { MessageQuery } from '@/queries/utils/messageQuery';
import { ChatListResponseDto } from '@/chats/dto/chat-list-response.dto';
import { plainToInstance } from 'class-transformer';
import { ChatType, Role, type User } from '@prisma/client';
import type { ChatMembersCreateInput } from '@/utils/types';
import { ChatResponseDto } from '@/chats/dto/chat-response.dto';

@Injectable()
export class ChatsService {
  constructor(
    private query: Query,
    private messageQuery: MessageQuery,
  ) {}

  async create(createChatDto: CreateChatDto, user: User) {
    const { name, type } = createChatDto;

    const chat = await this.query.createChat(type, name);

    if (!chat) {
      throw new InternalServerErrorException('Failed to create chat');
    }

    const chatMembers: ChatMembersCreateInput[] = [
      { user_id: user.id, chat_id: chat.id, role: chat.type === ChatType.group ? Role.owner : null },
      ...createChatDto.receiverIds.reduce<ChatMembersCreateInput[]>((acc, receiverId) => ([
        ...acc,
        { user_id: receiverId, chat_id: chat.id, role: chat.type === ChatType.group ? Role.member : null },
      ]), []),
    ];

    await this.query.addMembersToChat(chatMembers);

    if (createChatDto.message) {
      const message = await this.messageQuery.createMessage({
        message: {
          user_id : user.id,
          chat_id : chat.id,
          content : createChatDto.message,
        },
        attachments: [],
      });

      await this.query.updateChat(chat.id, createChatDto, message.id);
    }

    const createdChat = await this.query.getChat(chat.id);

    return plainToInstance(ChatResponseDto, ChatResponseDto.from(createdChat));
  }

  async findAll(userId: bigint): Promise<ChatListResponseDto[]> {
    const userChats = await this.query.getUserChats(userId);

    const mappedChats = userChats.map(({ chat }) => chat);
    return plainToInstance(ChatListResponseDto, mappedChats);
  }

  async findOne(id: bigint) {
    const chat = await this.query.getChat(id);

    return plainToInstance(ChatResponseDto, ChatResponseDto.from(chat));
  }

  async update(id: bigint, updateChatDto: UpdateChatDto) {
    const chat = await this.query.getChat(id);

    if (chat.type !== ChatType.group) {
      throw new InternalServerErrorException('Private chat can\'t be updated!');
    }

    const updatedChat = await this.query.updateChat(id, updateChatDto);
    return plainToInstance(ChatResponseDto, ChatResponseDto.from(updatedChat));
  }

  async remove(chatId: bigint, userId: bigint) {
    const userAccess = await this.query.getUserAccessInChat(userId, chatId);

    if (userAccess.role && userAccess.role !== Role.admin) {
      throw new UnauthorizedException();
    }

    await this.query.removeChat(chatId);
  }

  async checkUserAccessToChat(userId: bigint, chatId: bigint) {
    const memberRow = await this.query.getUserAccessInChat(userId, chatId);

    return memberRow !== null;
  }
}
