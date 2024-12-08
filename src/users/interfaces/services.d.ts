import type { User } from "@prisma/client";
import { UserRegisterDto } from "@/users/dto/user-register.dto";

export interface IUserService {
  findBy(property: string, value: number): Promise<User | null>;

  updateUserRefreshToken(user: User, refreshToken: string): Promise<void>;

  createUser(credentials: UserRegisterDto): Promise<User>;
}
