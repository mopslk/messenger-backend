import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MessageQuery } from '@/queries/utils/messageQuery';
import { getFileType, getFileUrl } from '@/utils/helpers/file';
import { CreateMessageDto } from '@/messages/dto/create-message.dto';
import { UpdateMessageDto } from '@/messages/dto/update-message.dto';
import { MessageResponseDto } from '@/messages/dto/message-response.dto';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { NotificationsService } from '@/notifications/notifications.service';
import { NotificationType } from '@/notifications/enums/events-enum';
import { ChatQuery } from '@/queries/utils/chatQuery';
import { formatChatMembers } from '@/utils/helpers/formatters';

@Injectable()
export class MessagesService {
  constructor(
    private query: MessageQuery,
    private chatQuery: ChatQuery,
    private notificationsService: NotificationsService,
  ) {}

  getMessageAttachments(files: Express.Multer.File[]) {
    return files.map((file) => ({
      type : getFileType(file.filename),
      path : getFileUrl(file.path),
    }));
  }

  async create(createMessageDto: CreateMessageDto, files: Express.Multer.File[], userId: bigint, chatId: bigint) {
    const attachments = this.getMessageAttachments(files);

    try {
      const message = await this.query.createMessage({
        message: {
          content : createMessageDto.content,
          chat_id : chatId,
          user_id : userId,
        },
        attachments,
      });

      const response = plainToInstance(MessageResponseDto, MessageResponseDto.from(message), {
        excludeExtraneousValues: true,
      });

      const roomMembers = await this.chatQuery.getChatMembers(chatId);

      const chatMemberIds = formatChatMembers(roomMembers, userId);

      await this.notificationsService.sendSocketEvent(
        chatMemberIds,
        NotificationType.NewMessage,
        instanceToPlain(response),
      );

      return response;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: bigint, updateMessageDto: UpdateMessageDto, userId: bigint) {
    const updatedMessage = await this.query.updateMessage({
      message_id: id,
      ...updateMessageDto,
    });

    const response = plainToInstance(MessageResponseDto, MessageResponseDto.from(updatedMessage), {
      excludeExtraneousValues: true,
    });

    const roomMembers = await this.chatQuery.getChatMembers(updatedMessage.chat_id);

    const chatMemberIds = formatChatMembers(roomMembers, userId);

    await this.notificationsService.sendSocketEvent(
      chatMemberIds,
      NotificationType.UpdateMessage,
      instanceToPlain(response),
    );

    return response;
  }

  async checkUserAccessToMessage(userId: bigint, messageId: bigint) {
    return this.query.checkUserAccessToMessage(userId, messageId);
  }

  async remove(id: bigint, userId: bigint) {
    const message = await this.query.deleteMessage(id);

    if (!message) throw new InternalServerErrorException('Message not found');

    await this.query.deleteMessage(id);

    const roomMembers = await this.chatQuery.getChatMembers(message.chat_id);

    const chatMemberIds = formatChatMembers(roomMembers, userId);

    await this.notificationsService.sendSocketEvent(
      chatMemberIds,
      NotificationType.DeleteMessage,
      { messageId: id.toString(), chatId: message.chat_id.toString() },
    );
  }
}
