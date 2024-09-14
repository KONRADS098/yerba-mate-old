import { Test, TestingModule } from '@nestjs/testing';
import { UserVoteController } from './user-vote.controller';
import { UserVoteService } from './user-vote.service';

describe('UserVoteController', () => {
  let controller: UserVoteController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: UserVoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserVoteController],
      providers: [
        {
          provide: UserVoteService,
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

    controller = module.get<UserVoteController>(UserVoteController);
    service = module.get<UserVoteService>(UserVoteService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
