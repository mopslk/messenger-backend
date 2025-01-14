import { Exclude, Transform } from 'class-transformer';

export class UserResponseDto {
  @Transform(({ value }) => value.toString())
    id: BigInt;

  login: string;

  name: string;

  bio?: string;

  avatar?: string;

  @Exclude()
    password: string;

  @Exclude()
    secret: string;

  @Exclude()
    refresh_token: string;

  @Exclude()
    tokens_cleared_at: string;

  @Exclude()
    info: PrismaJson.UserInfoType;
}
