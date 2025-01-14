import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import type { ChatType } from '@prisma/client';

export class CreateChatDto {
  @IsArray()
  @IsNotEmpty()
    receiverIds: bigint[];

  @IsString()
    message?: string;

  @IsString()
    name?: string;

  @IsString()
  @IsNotEmpty()
    type: ChatType;
}
