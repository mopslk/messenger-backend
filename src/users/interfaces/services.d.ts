import type { User } from '@prisma/client';
import { UserRegisterDto } from '@/users/dto/user-register.dto';
import type { RequestWithUserType } from '@/utils/types';
import type { JwtPayload } from 'jsonwebtoken';

export interface IUserService {
  findBy(property: string, value: number): Promise<User | null>;

  updateUserRefreshToken(user: User, refreshToken: string): Promise<void>;

  checkSecurity(request: RequestWithUserType, decodedUser: JwtPayload): Promise<void>;

  removeRefreshToken(userId: bigint): Promise<void>;

  createUser(credentials: UserRegisterDto): Promise<User>;
}
