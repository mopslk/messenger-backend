import { User } from '@/users/entity/user';

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
  user: Omit<User, 'password' | 'refresh_token'>;
  tokens: TokensResponseType;
};
