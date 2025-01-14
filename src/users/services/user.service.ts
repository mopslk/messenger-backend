import {
  forwardRef, Inject, Injectable, UnauthorizedException,
} from '@nestjs/common';
import type { User } from '@prisma/client';
import type { IUserService } from '@/users/interfaces/services';
import { hash, hashCompare } from '@/utils/helpers/hash';
import { getTokenSignature } from '@/utils/helpers/token';
import { PrismaService } from '@/prisma/prisma.service';
import { UserRegisterDto } from '@/users/dto/user-register.dto';
import type { RequestWithUserType } from '@/utils/types';
import type { JwtPayload } from 'jsonwebtoken';
import { convertSecondsToMs } from '@/utils/helpers/formatters';

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

  async checkSecurity(request: RequestWithUserType, decodedUser: JwtPayload): Promise<void> {
    const user = await request.user;
    const requestInfo: PrismaJson.UserInfoType = {
      ip        : request.ip,
      userAgent : request.headers['user-agent'],
    } as const;

    if (Number(user.tokens_cleared_at) > convertSecondsToMs(decodedUser.iat)) {
      throw new UnauthorizedException();
    }

    const promises = Object.entries(requestInfo).map(async ([key, value]) => {
      const isValid = await hashCompare(value, user.info[key]);

      if (!isValid) {
        await this.removeRefreshToken(user.id);
        throw new UnauthorizedException();
      }
    });

    await Promise.all(promises);
  }

  async removeRefreshToken(userId: bigint): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refresh_token     : null,
        tokens_cleared_at : String(Date.now()),
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
