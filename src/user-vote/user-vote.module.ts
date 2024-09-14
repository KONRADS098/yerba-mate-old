import { Module } from '@nestjs/common';
import { UserVoteService } from './user-vote.service';
import { UserVoteController } from './user-vote.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  UserFlavorVote,
  UserLongevityVote,
  UserTemperatureVote,
} from './user-vote.entity';
import { YerbaMate } from '../yerba-mate/yerba-mate.entity';
import { Flavor } from '../flavor/flavor.entity';
import { User } from '../user/user.entity';

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
