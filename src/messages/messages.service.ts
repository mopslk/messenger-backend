import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MessageQuery } from '@/queries/utils/messageQuery';
import { getFileType, getFileUrl } from '@/utils/helpers/file';
import { CreateMessageDto } from '@/messages/dto/create-message.dto';
import { UpdateMessageDto } from '@/messages/dto/update-message.dto';
import { MessageResponseDto } from '@/messages/dto/message-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class MessagesService {
  constructor(
    private query: MessageQuery,
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

      return plainToInstance(MessageResponseDto, MessageResponseDto.from(message), {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: bigint, updateMessageDto: UpdateMessageDto) {
    const updatedMessage = await this.query.updateMessage({
      message_id: id,
      ...updateMessageDto,
    });

    return plainToInstance(MessageResponseDto, MessageResponseDto.from(updatedMessage), {
      excludeExtraneousValues: true,
    });
  }

  async checkUserAccessToMessage(userId: bigint, messageId: bigint) {
    return this.query.checkUserAccessToMessage(userId, messageId);
  }

  async remove(id: bigint) {
    await this.query.deleteMessage(id);
  }
}
