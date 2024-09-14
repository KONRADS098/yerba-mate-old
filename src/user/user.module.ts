import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../shared/entities/user.entity';
import {
  UserFlavorVote,
  UserLongevityVote,
  UserTemperatureVote,
} from '../user-vote/user-vote.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserFlavorVote,
      UserTemperatureVote,
      UserLongevityVote,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
