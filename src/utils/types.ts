import { UserResponseDto } from '@/users/dto/user.response.dto';
import type { Request } from 'express';
import type { User } from '@prisma/client';

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
  refreshToken?: string;
};

export type AuthResponseType = {
  user: UserResponseDto;
  tokens: TokensResponseType;
};

export type RequestWithUserType = {
  user?: Promise<User>
} & Request;
