import { Test, TestingModule } from '@nestjs/testing';
import { UserFlavorVoteService } from '../services/user-flavor-vote.service';
import { UserFlavorVoteController } from './user-flavor-vote.controller';

describe('UserFlavorVoteController', () => {
  let controller: UserFlavorVoteController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: UserFlavorVoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserFlavorVoteController],
      providers: [
        {
          provide: UserFlavorVoteService,
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

    controller = module.get<UserFlavorVoteController>(UserFlavorVoteController);
    service = module.get<UserFlavorVoteService>(UserFlavorVoteService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
