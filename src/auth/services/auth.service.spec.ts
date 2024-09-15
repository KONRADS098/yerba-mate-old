import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import { Redis } from 'ioredis';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../../user/enums/user-role.enum';
import { AuthService } from './auth.service';
import { LoginDto } from '../dtos/login.dto';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;
  let configService: ConfigService;
  let redisClient: Redis;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findByEmailOrUsername: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: 'REDIS_CLIENT',
          useValue: {
            set: jest.fn(),
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);
    redisClient = module.get<Redis>('REDIS_CLIENT');
  });

  describe('validateUser', () => {
    it('should return user data without password if credentials are correct', async () => {
      const user = {
        id: 1,
        username: 'test',
        email: 'test@test.com',
        password: 'hashedPassword',
        role: UserRole.USER,
        flavorVotes: [],
        temperatureVotes: [],
        longevityVotes: [],
      };
      jest.spyOn(userService, 'findByEmailOrUsername').mockResolvedValue(user);
      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(true));

      const result = await authService.validateUser('test', 'password');

      expect(result).toEqual({
        id: 1,
        username: 'test',
        email: 'test@test.com',
        role: 'user',
        flavorVotes: [],
        temperatureVotes: [],
        longevityVotes: [],
      });
    });

    it('should return null if credentials are incorrect', async () => {
      jest.spyOn(userService, 'findByEmailOrUsername').mockResolvedValue(null);

      const result = await authService.validateUser('test', 'password');

      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should throw UnauthorizedException if credentials are invalid', async () => {
      jest.spyOn(authService, 'validateUser').mockResolvedValue(null);

      const loginDto: LoginDto = { identifier: 'test', password: 'password' };

      await expect(authService.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should return access and refresh tokens if credentials are valid', async () => {
      const user = {
        id: 1,
        username: 'test',
        email: 'test@test.com',
        role: UserRole.USER,
      };
      jest.spyOn(authService, 'validateUser').mockResolvedValue(user);
      jest.spyOn(jwtService, 'sign').mockReturnValue('accessToken');
      jest.spyOn(configService, 'get').mockReturnValue('secret');

      const loginDto: LoginDto = { identifier: 'test', password: 'password' };

      const result = await authService.login(loginDto);

      expect(result).toEqual({
        accessToken: 'accessToken',
        refreshToken: 'accessToken',
      });
    });
  });

  describe('refreshToken', () => {
    it('should throw UnauthorizedException if the refresh token is invalid', async () => {
      jest.spyOn(jwtService, 'verify').mockImplementation(() => {
        throw new Error();
      });

      const refreshTokenDto: RefreshTokenDto = {
        refreshToken: 'refreshToken',
      };
      await expect(authService.refreshToken(refreshTokenDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if the stored refresh token does not match', async () => {
      const payload = {
        sub: 1,
        username: 'test',
        email: 'test@test.com',
        role: UserRole.USER,
      };
      jest.spyOn(jwtService, 'verify').mockReturnValue(payload);
      jest.spyOn(redisClient, 'get').mockResolvedValue('differentToken');

      const refreshTokenDto: RefreshTokenDto = {
        refreshToken: 'validToken',
      };
      await expect(authService.refreshToken(refreshTokenDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if the user does not exist', async () => {
      const payload = {
        sub: 1,
        username: 'test',
        email: 'test@test.com',
        role: UserRole.USER,
      };
      jest.spyOn(jwtService, 'verify').mockReturnValue(payload);
      jest.spyOn(redisClient, 'get').mockResolvedValue('validToken');
      jest.spyOn(userService, 'findOne').mockResolvedValue(null);

      const refreshTokenDto: RefreshTokenDto = {
        refreshToken: 'validToken',
      };
      await expect(authService.refreshToken(refreshTokenDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should return new access and refresh tokens if the refresh token is valid', async () => {
      const payload = {
        sub: 1,
        username: 'test',
        email: 'test@test.com',
        role: UserRole.USER,
      };
      const user = {
        id: 1,
        username: 'test',
        email: 'test@test.com',
        password: 'hashedPassword',
        role: UserRole.USER,
        flavorVotes: [],
        temperatureVotes: [],
        longevityVotes: [],
      };
      jest.spyOn(jwtService, 'verify').mockReturnValue(payload);
      jest.spyOn(redisClient, 'get').mockResolvedValue('validToken');
      jest.spyOn(userService, 'findOne').mockResolvedValue(user);
      jest.spyOn(jwtService, 'sign').mockReturnValue('newAccessToken');
      jest.spyOn(configService, 'get').mockReturnValue('secret');

      const refreshTokenDto: RefreshTokenDto = {
        refreshToken: 'validToken',
      };

      const result = await authService.refreshToken(refreshTokenDto);

      expect(result).toEqual({
        accessToken: 'newAccessToken',
        refreshToken: 'newAccessToken',
      });
    });
  });
});
