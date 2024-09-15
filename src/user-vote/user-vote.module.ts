import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { YerbaMate } from '../shared/entities/yerba-mate.entity';
import { Flavor } from '../shared/entities/flavor.entity';
import { User } from '../shared/entities/user.entity';
import {
  UserTemperatureVote,
  UserFlavorVote,
  UserLongevityVote,
} from '../shared/entities/user-vote.entity';
import { UserFlavorVoteService } from './flavor-vote/services/user-flavor-vote.service';
import { UserLongevityVoteService } from './longevity-vote/services/user-longevity-vote.service';
import { UserTemperatureVoteService } from './temperature-vote/services/user-temperature-vote.service';
import { UserFlavorVoteController } from './flavor-vote/controllers/user-flavor-vote.controller';
import { UserLongevityVoteController } from './longevity-vote/controllers/user-longevity-vote.controller';
import { UserTemperatureVoteController } from './temperature-vote/controllers/user-temperature-vote.controller';

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
  providers: [
    UserFlavorVoteService,
    UserLongevityVoteService,
    UserTemperatureVoteService,
  ],
  controllers: [
    UserFlavorVoteController,
    UserLongevityVoteController,
    UserTemperatureVoteController,
  ],
})
export class UserVoteModule {}
