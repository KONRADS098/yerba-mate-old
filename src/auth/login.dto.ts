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
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;
}

export class RefreshTokenDto {
  @IsString()
  refreshToken: string;
}

export class RefreshTokenResponseDto extends LoginResponseDto {}
