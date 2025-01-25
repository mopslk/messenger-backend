import {
  Body, Controller, Delete, Get, Param, Patch, Post, UseGuards,
} from '@nestjs/common';
import type { User } from '@prisma/client';
import { CurrentUser } from '@/utils/decorators/current-user.decorator';
import { ChatsService } from '@/chats/chats.service';
import { CreateChatDto } from '@/chats/dto/create-chat.dto';
import { UpdateChatDto } from '@/chats/dto/update-chat.dto';
import { ChatGuard } from '@/auth/guards/chat.guard';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  async create(@CurrentUser() user: User, @Body() createChatDto: CreateChatDto) {
    return this.chatsService.create(createChatDto, user);
  }

  @Get()
  async findAll(@CurrentUser() user: User) {
    return this.chatsService.findAll(user.id);
  }

  @UseGuards(ChatGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.chatsService.findOne(BigInt(id));
  }

  @UseGuards(ChatGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatsService.update(BigInt(id), updateChatDto);
  }

  @UseGuards(ChatGuard)
  @Delete(':id')
  async remove(@CurrentUser() user: User, @Param('id') id: string) {
    return this.chatsService.remove(BigInt(id), user.id);
  }
}
