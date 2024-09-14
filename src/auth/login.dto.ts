// login.dto.ts
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  identifier: string;

  @IsString()
  password: string;
}

export class LoginResponseDto {
  @Expose({ name: 'access_token' })
  accessToken: string;
}
