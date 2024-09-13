import { Module } from '@nestjs/common';
import { UserVoteService } from './user-vote.service';
import { UserVoteController } from './user-vote.controller';

@Module({
  providers: [UserVoteService],
  controllers: [UserVoteController],
})
export class UserVoteModule {}
