import { Module } from '@nestjs/common';
import { FlavorService } from './flavor.service';
import { FlavorController } from './flavor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flavor } from './flavor.entity';
import { UserFlavorVote } from 'src/user-vote/user-vote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Flavor, UserFlavorVote])],
  providers: [FlavorService],
  controllers: [FlavorController],
})
export class FlavorModule {}
