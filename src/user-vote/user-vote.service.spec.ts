import { Test, TestingModule } from '@nestjs/testing';
import { UserVoteService } from './user-vote.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  UserFlavorVote,
  UserLongevityVote,
  UserTemperatureVote,
} from './user-vote.entity';
import { Repository } from 'typeorm';

describe('UserVoteService', () => {
  let service: UserVoteService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let flavorVoteRepository: Repository<UserFlavorVote>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let longevityVoteRepository: Repository<UserLongevityVote>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let temperatureVoteRepository: Repository<UserTemperatureVote>;

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserVoteService,
        {
          provide: getRepositoryToken(UserFlavorVote),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(UserLongevityVote),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(UserTemperatureVote),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserVoteService>(UserVoteService);
    flavorVoteRepository = module.get<Repository<UserFlavorVote>>(
      getRepositoryToken(UserFlavorVote),
    );
    longevityVoteRepository = module.get<Repository<UserLongevityVote>>(
      getRepositoryToken(UserLongevityVote),
    );
    temperatureVoteRepository = module.get<Repository<UserTemperatureVote>>(
      getRepositoryToken(UserTemperatureVote),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
