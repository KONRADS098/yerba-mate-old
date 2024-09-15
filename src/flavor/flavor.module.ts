import { Module } from '@nestjs/common';
import { FlavorService } from './services/flavor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flavor } from '../shared/entities/flavor.entity';
import { UserFlavorVote } from '../shared/entities/user-vote.entity';
import { FlavorController } from './controllers/flavor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Flavor, UserFlavorVote])],
  providers: [FlavorService],
  controllers: [FlavorController],
})
export class FlavorModule {}
