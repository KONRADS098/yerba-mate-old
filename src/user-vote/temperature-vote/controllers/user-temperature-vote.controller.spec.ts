import { Test, TestingModule } from '@nestjs/testing';
import { UserTemperatureVoteService } from '../services/user-temperature-vote.service';
import { UserTemperatureVoteController } from './user-temperature-vote.controller';

describe('UserTemperatureVoteController', () => {
  let controller: UserTemperatureVoteController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: UserTemperatureVoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTemperatureVoteController],
      providers: [
        {
          provide: UserTemperatureVoteService,
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

    controller = module.get<UserTemperatureVoteController>(
      UserTemperatureVoteController,
    );
    service = module.get<UserTemperatureVoteService>(
      UserTemperatureVoteService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
