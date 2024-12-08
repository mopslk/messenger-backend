import type { User } from "@prisma/client";
import type { AuthResponseType, TokensResponseType } from '@/utils/types';
import { UserRegisterDto } from "@/users/dto/user-register.dto";
import { UserLoginDto } from "@/auth/dto/user-login.dto";

export interface IAuthService {
  validateUser(userLoginDto: UserLoginDto): Promise<User | null>;

  generateTokens(userId: bigint): Promise<TokensResponseType>;

  refresh(refreshToken: string): Promise<TokensResponseType>;

  login(user: User): Promise<AuthResponseType>;

  register(credentials: UserRegisterDto): Promise<AuthResponseType>;
}
