import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable, InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { User } from "@prisma/client";
import { plainToInstance } from "class-transformer";
import { UserService } from '@/users/services/user.service';
import type { IAuthService } from '@/auth/interfaces/services';
import { hashCompare } from '@/utils/helpers/hash';
import { getTokenSignature } from '@/utils/helpers/token';
import {UserRegisterDto} from "@/users/dto/user-register.dto";
import type {AuthResponseType} from "@/utils/types";
import { UserResponseDto } from "@/users/dto/user.response.dto";
import { UserLoginDto } from "@/auth/dto/user-login.dto";

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userLoginDto: UserLoginDto) {
    const user = await this.userService.findBy('login', userLoginDto.login);
    const matchPasswords = await hashCompare(userLoginDto.password, user.password);

    if (user && matchPasswords) {
      return user;
    }
    return null;
  }

  async generateTokens(userId: bigint) {
    const payload = { sub: userId.toString() };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret    : process.env.JWT_SECRET_KEY,
      expiresIn : '30m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret    : process.env.JWT_REFRESH_SECRET_KEY,
      expiresIn : '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshToken: string) {
    const userDataFromToken = await this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET_KEY,
    });

    const user = await this.userService.findBy('id', BigInt(userDataFromToken.sub));

    const compareHashTokens = await hashCompare(getTokenSignature(refreshToken), user.refresh_token);

    if (!user || !compareHashTokens) {
      throw new BadRequestException('Invalid refresh token');
    }

    const tokens = await this.generateTokens(user.id);
    await this.userService.updateUserRefreshToken(user, tokens.refreshToken);

    return tokens;
  }

  async login(user: User): Promise<AuthResponseType> {
    const tokens = await this.generateTokens(user.id);

    await this.userService.updateUserRefreshToken(user, tokens.refreshToken);

    return {
      user: plainToInstance(UserResponseDto, user),
      tokens,
    };
  }

  async register(credentials: UserRegisterDto): Promise<AuthResponseType> {
    try {
      const user = await this.userService.createUser(credentials);

      const tokens = await this.generateTokens(user.id);

      await this.userService.updateUserRefreshToken(user, tokens.refreshToken);

      return {
        user: plainToInstance(UserResponseDto, user),
        tokens,
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
