import { User } from '@/users/entity/user';
import { UserRegisterDto } from '@/users/dto/user-register.dto';
import type { AuthResponseType } from '@/utils/types';

export interface IUserService {
  findBy(property: string, value: number): Promise<User | null>;

  updateUserRefreshToken(user: User, refreshToken: string): Promise<void>;

  register(credentials: UserRegisterDto): Promise<AuthResponseType>;
}
