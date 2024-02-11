import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ExtractJwt } from 'passport-jwt';
import { Reflector } from '@nestjs/core';
import { UserService } from '@/users/services/user.service';

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
    const getTokenFunc = ExtractJwt.fromAuthHeaderAsBearerToken();
    const token = getTokenFunc(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const decodedUser = this.jwtService.decode(token);
      request.user = this.userService.findBy('id', decodedUser.sub);
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
