import { Module } from '@nestjs/common';
import { UserVoteService } from './user-vote.service';
import { UserVoteController } from './user-vote.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { YerbaMate } from '../shared/entities/yerba-mate.entity';
import { Flavor } from '../shared/entities/flavor.entity';
import { User } from '../shared/entities/user.entity';
import {
  UserTemperatureVote,
  UserFlavorVote,
  UserLongevityVote,
} from '../shared/entities/user-vote.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserTemperatureVote,
      UserFlavorVote,
      UserLongevityVote,
      YerbaMate,
      Flavor,
      User,
    ]),
  ],
  providers: [UserVoteService],
  controllers: [UserVoteController],
})
export class UserVoteModule {}
