import type { User } from '@prisma/client';
import type { AuthResponseType, TokensResponseType } from '@/utils/types';
import { UserRegisterDto } from '@/users/dto/user-register.dto';
import { UserLoginDto } from '@/auth/dto/user-login.dto';

export interface IAuthService {
  validateUser(userLoginDto: UserLoginDto): Promise<User | null>;

  generateTokens(userId: bigint, onlyAccessToken?: boolean): Promise<TokensResponseType>;

  refresh(refreshToken: string): Promise<TokensResponseType>;

  login(user: User, userInfo: PrismaJson.UserInfoType): Promise<AuthResponseType>;

  register(credentials: UserRegisterDto): Promise<AuthResponseType>;

  verifyCode(secret: string, token: string): Promise<Boolean>;

  generateCode(user: User): Promise<string>;

  checkingForTwoFactor(user: User, code?: string): Promise<void>

  setUserInfo(user: User, userInfo: PrismaJson.UserInfoType): Promise<void>;
}
