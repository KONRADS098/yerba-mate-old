import { Test, TestingModule } from '@nestjs/testing';
import { UserLongevityVoteController } from './user-longevity-vote.controller';
import { UserLongevityVoteService } from '../services/user-longevity-vote.service';

describe('UserLongevityVoteController', () => {
  let controller: UserLongevityVoteController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: UserLongevityVoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserLongevityVoteController],
      providers: [
        {
          provide: UserLongevityVoteService,
          useValue: {
            // Mock implementation of UserVoteService methods
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({}),
            create: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            remove: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<UserLongevityVoteController>(
      UserLongevityVoteController,
    );
    service = module.get<UserLongevityVoteService>(UserLongevityVoteService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
