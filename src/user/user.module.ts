import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../shared/entities/user.entity';
import {
  UserFlavorVote,
  UserTemperatureVote,
  UserLongevityVote,
} from '../shared/entities/user-vote.entity';
import { UserController } from './controllers/user.controller';

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
