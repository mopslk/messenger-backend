import {
  CanActivate, ExecutionContext, Injectable, UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { UserService } from '@/users/user.service';
import type { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async canActivate(ctx: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>('isPublic', ctx.getHandler());
    if (isPublic) {
      return true;
    }

    const request = ctx.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const decodedUser = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: process.env.JWT_SECRET,
      });
      request.user = this.userService.findBy('id', decodedUser.sub);

      if (request.user.secret && String(request.route.path).includes('2fa')) { // TODO: Рефактор
        return false;
      }

      await this.userService.checkSecurity(request, decodedUser);
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
