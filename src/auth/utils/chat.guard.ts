import {
  CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ChatsService } from '@/chats/chats.service';

@Injectable()
export class ChatGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private chatService: ChatsService,
  ) {}

  async canActivate(ctx: ExecutionContext) {
    const request = ctx.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const decodedUser = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      return await this.chatService.checkUserAccessToChat(BigInt(decodedUser.sub), BigInt(request.params.id));
    } catch {
      throw new ForbiddenException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
