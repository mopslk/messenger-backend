import { User } from '@/users/entity/user';
import type { AuthResponseType, TokensResponseType } from '@/utils/types';

export interface IAuthService {
  validateUser(login: string, password: string): Promise<User | null>;

  generateTokens(userId: number): Promise<TokensResponseType>;

  refresh(refreshToken: string): Promise<TokensResponseType>;

  login(user: User): Promise<AuthResponseType>;
}
