import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('test_secret'),
          },
        },
      ],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  it('should validate payload', async () => {
    const payload = {
      sub: 1,
      username: 'test',
      email: 'test@test.com',
      role: 'user',
    };
    const result = await strategy.validate(payload);
    expect(result).toEqual({
      userId: payload.sub,
      username: payload.username,
      email: payload.email,
      role: payload.role,
    });
  });
});
