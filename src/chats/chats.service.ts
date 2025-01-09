import { Injectable } from '@nestjs/common';
import { CreateChatDto } from '@/chats/dto/create-chat.dto';
import { UpdateChatDto } from '@/chats/dto/update-chat.dto';
import Query from '@/chats/queries';
import { ChatResponseDto } from '@/chats/dto/chat-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ChatsService {
  constructor(
    private query: Query,
  ) {}

  create(createChatDto: CreateChatDto) {
    return 'This action adds a new chat';
  }

  async findAll(userId: bigint): Promise<ChatResponseDto[]> {
    const userChats = await this.query.getUserChats(userId);

    const mappedChats = userChats.map(({ chat }) => chat);
    return plainToInstance(ChatResponseDto, mappedChats);
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
