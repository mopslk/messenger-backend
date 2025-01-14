import { UserResponseDto } from '@/users/dto/user.response.dto';
import type { MessageAttachments, Role } from '@prisma/client';

export type ErrorType = {
  response: {
    message: string | string[];
    error?: string;
    statusCode: number;
  };
};

export interface SuccessResponseType<T> {
  data: T;
  success: boolean;
}

export type TokensResponseType = {
  accessToken: string;
  refreshToken: string;
};

export type AuthResponseType = {
  user: UserResponseDto;
  tokens: TokensResponseType;
};

export type ChatMembersType = {
  login: string,
  name: string,
  avatar: string | null,
  role: Role | null,
};

export type ChatMembersCreateInput = {
  user_id: bigint;
  role: Role | null;
  chat_id: bigint;
};

export type CreateMessageType = {
  user_id: bigint;
  chat_id: bigint;
  content: string;
};

export type MessageCreateInput = {
  message: CreateMessageType;
  attachments: Omit<MessageAttachments, 'message_id'>[]
};
