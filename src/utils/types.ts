import { UserResponseDto } from '@/users/dto/user.response.dto';
import type { Role } from '@prisma/client';

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
