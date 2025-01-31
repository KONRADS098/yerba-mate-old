// auth.service.ts
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/services/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../../shared/entities/user.entity';
import { UserRole } from '../../user/enums/user-role.enum';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';
import { LoginDto } from '../dtos/login.dto';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
  ) {}

  async validateUser(
    identifier: string,
    password: string,
  ): Promise<Partial<User> | null> {
    const user = await this.userService.findByEmailOrUsername(identifier);

    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(
      loginDto.identifier,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      username: user.username,
      email: user.email,
      sub: user.id,
      role: user.role as UserRole,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION'),
    });

    await this.redisClient.set(
      `refresh_token:${user.id}`,
      refreshToken,
      'EX',
      7 * 24 * 60 * 60,
    ); // 7 days expiration

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    try {
      const payload = this.jwtService.verify(refreshTokenDto.refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      const storedRefreshToken = await this.redisClient.get(
        `refresh_token:${payload.sub}`,
      );
      if (storedRefreshToken !== refreshTokenDto.refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const user = await this.userService.findOne(payload.sub);
      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const newPayload = {
        username: user.username,
        email: user.email,
        sub: user.id,
        role: user.role as UserRole,
      };

      const newAccessToken = this.jwtService.sign(newPayload);
      const newRefreshToken = this.jwtService.sign(newPayload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION'),
      });

      await this.redisClient.set(
        `refresh_token:${user.id}`,
        newRefreshToken,
        'EX',
        7 * 24 * 60 * 60,
      ); // 7 days expiration

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
