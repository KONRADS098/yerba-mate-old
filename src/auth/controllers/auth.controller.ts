// auth.controller.ts
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { plainToInstance } from 'class-transformer';
import { LoginResponseDto } from '../dtos/login-response.dto';
import { LoginDto } from '../dtos/login.dto';
import { RefreshTokenResponseDto } from '../dtos/refresh-token-response.dto';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    const tokens = await this.authService.login(loginDto);
    return plainToInstance(LoginResponseDto, { ...tokens });
  }

  @UseGuards(AuthGuard('local'))
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh Token' })
  @ApiResponse({ status: 200, description: 'Token refreshed successfully' })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
  async refresh(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<RefreshTokenResponseDto> {
    const tokens = await this.authService.refreshToken(refreshTokenDto);
    return plainToInstance(RefreshTokenResponseDto, { ...tokens });
  }
}
