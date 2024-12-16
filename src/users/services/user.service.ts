import { forwardRef, Inject, Injectable } from '@nestjs/common';
import type { User } from '@prisma/client';
import type { IUserService } from '@/users/interfaces/services';
import { hash } from '@/utils/helpers/hash';
import { getTokenSignature } from '@/utils/helpers/token';
import { PrismaService } from '@/prisma/prisma.service';
import { UserRegisterDto } from '@/users/dto/user-register.dto';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private prisma: PrismaService,
  ) {}

  async findBy(property: keyof User, value: unknown): Promise<User> {
    return this.prisma.user.findFirst({
      where: {
        [property]: value,
      },
    });
  }

  async updateUserRefreshToken(user: User, refreshToken: string): Promise<void> {
    const hashedRefreshToken = await hash(getTokenSignature(refreshToken));

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        refresh_token: hashedRefreshToken,
      },
    });
  }

  async setTwoFactorAuthenticationSecret(secret: string, userId: bigint): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        secret,
      },
    });
  }

  async createUser(data: UserRegisterDto): Promise<User> {
    const hashedPassword = await hash(data.password);

    data.setPassword(hashedPassword);
    data.removePasswordConfirmationField();

    return this.prisma.user.create({
      data,
    });
  }
}
