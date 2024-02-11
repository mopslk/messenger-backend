import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import type { IUserService } from '@/users/interfaces/services';
import type { AuthResponseType } from '@/utils/types';
import { User } from '@/users/entity/user';
import { UserRegisterDto } from '@/users/dto/user-register.dto';
import { AuthService } from '@/auth/services/auth.service';
import { hash } from '@/utils/helpers/hash';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  async findBy(property: string, value: unknown): Promise<User> {
    return this.userRepository.findOneBy({
      [property]: value,
    });
  }

  async updateUserRefreshToken(user: User, refreshToken: string): Promise<void> {
    const updatedUser = {
      ...user,
      refresh_token: refreshToken,
    };
    await this.userRepository.save(updatedUser);
  }

  async register(credentials: UserRegisterDto): Promise<AuthResponseType> {
    try {
      const hashedPassword = await hash(credentials.password);

      const user = this.userRepository.create({
        ...credentials,
        password: hashedPassword,
      });

      const tokens = await this.authService.generateTokens(user.id);
      await this.updateUserRefreshToken(user, tokens.refreshToken);

      return {
        user,
        tokens,
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
