import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { User } from '@/users/entity/user';
import { UserService } from '@/users/services/user.service';
import { CurrentUser } from '@/utils/decorators/current-user.decorator';
import { UserRegisterDto } from '@/users/dto/user-register.dto';
import { Public } from '@/utils/decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  async getProfile(@CurrentUser() user: User) {
    return user;
  }

  @Post('register')
  @Public()
  async register(@Body() credentials: UserRegisterDto) {
    return this.userService.register(credentials);
  }
}
