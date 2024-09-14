import { Module } from '@nestjs/common';
import { YerbaMateController } from './yerba-mate.controller';
import { YerbaMateService } from './yerba-mate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YerbaMate } from './yerba-mate.entity';
import { Brand } from '../brand/brand.entity';
import { Origin } from '../origin/origin.entity';
import { ProcessingMethod } from '../processing-method/processing-method.entity';
import {
  UserFlavorVote,
  UserLongevityVote,
  UserTemperatureVote,
} from '../user-vote/user-vote.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      YerbaMate,
      Brand,
      Origin,
      ProcessingMethod,
      UserFlavorVote,
      UserTemperatureVote,
      UserLongevityVote,
    ]),
  ],
  controllers: [YerbaMateController],
  providers: [YerbaMateService],
})
export class YerbaMateModule {}
