import { Test, TestingModule } from '@nestjs/testing';
import { UserVoteController } from './user-vote.controller';

describe('UserVoteController', () => {
  let controller: UserVoteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserVoteController],
    }).compile();

    controller = module.get<UserVoteController>(UserVoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
