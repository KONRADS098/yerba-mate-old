import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  LoginDto,
  LoginResponseDto,
  RefreshTokenResponseDto,
} from './login.dto';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserService } from '../user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../shared/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        JwtAuthGuard,
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('test_token'),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('test_value'),
          },
        },
        {
          provide: 'REDIS_CLIENT',
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return access and refresh tokens', async () => {
      const loginDto: LoginDto = { identifier: 'test', password: 'test' };
      const tokens = new LoginResponseDto();
      tokens.accessToken = 'accessToken';
      tokens.refreshToken = 'refreshToken';
      jest.spyOn(service, 'login').mockResolvedValue(tokens);

      const result = await controller.login(loginDto);
      expect(result).toEqual({
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      });
      expect(service.login).toHaveBeenCalledWith(loginDto);
    });
  });

  describe('refresh', () => {
    it('should return new access and refresh tokens', async () => {
      const refreshTokenDto = { refreshToken: 'refreshToken' };
      const tokens = new RefreshTokenResponseDto();
      tokens.accessToken = 'newAccessToken';
      tokens.refreshToken = 'newRefreshToken';
      jest.spyOn(service, 'refreshToken').mockResolvedValue(tokens);

      const result = await controller.refresh(refreshTokenDto);
      expect(result).toEqual({
        accessToken: 'newAccessToken',
        refreshToken: 'newRefreshToken',
      });
      expect(service.refreshToken).toHaveBeenCalledWith(refreshTokenDto);
    });
  });
});
