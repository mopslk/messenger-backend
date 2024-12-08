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
  refresh_token: string;
}
