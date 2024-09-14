import { Module } from '@nestjs/common';
import { FlavorService } from './flavor.service';
import { FlavorController } from './flavor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flavor } from '../shared/entities/flavor.entity';
import { UserFlavorVote } from '../shared/entities/user-vote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Flavor, UserFlavorVote])],
  providers: [FlavorService],
  controllers: [FlavorController],
})
export class FlavorModule {}
