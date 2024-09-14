import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../shared/entities/user.entity';
import {
  UserFlavorVote,
  UserTemperatureVote,
  UserLongevityVote,
} from '../shared/entities/user-vote.entity';

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
  exports: [UserService],
})
export class UserModule {}
