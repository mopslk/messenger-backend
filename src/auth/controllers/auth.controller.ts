import {
  BadRequestException,
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import type { AuthResponseType } from "@/utils/types";
import { AuthService } from '@/auth/services/auth.service';
import { Public } from '@/utils/decorators/public.decorator';
import { RefreshDto } from '@/auth/dto/refresh.dto';
import { UserRegisterDto } from "@/users/dto/user-register.dto";
import { UserLoginDto } from '@/auth/dto/user-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto) {
    const user = await this.authService.validateUser(userLoginDto);

    if (!user) {
      throw new BadRequestException('Invalid login or password!');
    }

    return this.authService.login(user);
  }

  @Public()
  @Post('refresh')
  async refresh(@Body() refreshDto: RefreshDto) {
    return this.authService.refresh(refreshDto.refreshToken);
  }

  @Post('register')
  @Public()
  async register(@Body() credentials: UserRegisterDto): Promise<AuthResponseType> {
    return this.authService.register(credentials);
  }
}
