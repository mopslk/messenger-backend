import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Match } from '@/utils/decorators/match.decorator';
import { Unique } from '@/utils/decorators/unique.decorator';
import { User } from '@/users/entity/user';

export class UserRegisterDto {
  @IsNotEmpty()
  @IsString()
  @Unique(User)
  login: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @Match('password')
  passwordConfirmation: string;

  @IsString()
  @IsOptional()
  bio: string | null;

  @IsString()
  @IsOptional()
  avatar: string | null;
}
