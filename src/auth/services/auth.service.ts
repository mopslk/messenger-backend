import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/users/services/user.service';
import { User } from '@/users/entity/user';
import type { IAuthService } from '@/auth/interfaces/services';
import { hash, hashCompare } from '@/utils/helpers/hash';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string) {
    const user = await this.userService.findBy('login', login);
    const matchPasswords = await hashCompare(password, user.password);

    if (user && matchPasswords) {
      return user;
    }
    return null;
  }

  async generateTokens(userId: number) {
    const payload = { sub: userId };
    const accessToken = this.jwtService.sign(payload, {
      secret    : process.env.JWT_SECRET_KEY,
      expiresIn : '1h',
    });

    const refreshToken = await hash(
      this.jwtService.sign(payload, {
        secret    : process.env.JWT_REFRESH_SECRET_KEY,
        expiresIn : '7d',
      }),
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshToken: string) {
    const user = await this.userService.findBy('refresh_token', refreshToken);

    if (!user) {
      throw new BadRequestException('Invalid refresh token');
    }

    const tokens = await this.generateTokens(user.id);
    await this.userService.updateUserRefreshToken(user, tokens.refreshToken);

    return tokens;
  }

  async login(user: User) {
    const tokens = await this.generateTokens(user.id);

    await this.userService.updateUserRefreshToken(user, tokens.refreshToken);

    return {
      user,
      tokens,
    };
  }
}
