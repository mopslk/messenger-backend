import {
  BadRequestException,
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { UserLoginDto } from '@/auth/dto/user-login.dto';
import { AuthService } from '@/auth/services/auth.service';
import { Public } from '@/utils/decorators/public.decorator';
import { RefreshDto } from '@/auth/dto/refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto) {
    const { login, password } = userLoginDto;
    const user = await this.authService.validateUser(login, password);

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
}
