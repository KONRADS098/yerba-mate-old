import { Module } from '@nestjs/common';
import { YerbaMateController } from './yerba-mate.controller';
import { YerbaMateService } from './yerba-mate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YerbaMate } from '../shared/entities/yerba-mate.entity';
import { Brand } from '../shared/entities/brand.entity';
import { Origin } from '../shared/entities/origin.entity';
import { ProcessingMethod } from '../shared/entities/processing-method.entity';
import {
  UserFlavorVote,
  UserLongevityVote,
  UserTemperatureVote,
} from '../shared/entities/user-vote.entity';

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
