import { Controller, Get } from '@nestjs/common';
import type { User } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { CurrentUser } from '@/utils/decorators/current-user.decorator';
import { UserResponseDto } from '@/users/dto/user-response.dto';

@Controller('user')
export class UserController {
  @Get('profile')
  async getProfile(@CurrentUser() user: User) {
    return plainToInstance(UserResponseDto, user);
  }
}
