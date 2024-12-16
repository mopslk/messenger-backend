import { Controller, Get } from '@nestjs/common';
import type { User } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { CurrentUser } from '@/utils/decorators/current-user.decorator';
import { UserResponseDto } from '@/users/dto/user.response.dto';
import { AuthService } from '@/auth/services/auth.service';

@Controller('user')
export class UserController {
  constructor(private authService: AuthService) {}

  @Get('profile')
  async getProfile(@CurrentUser() user: User) {
    return plainToInstance(UserResponseDto, user);
  }
}
