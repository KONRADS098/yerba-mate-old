import { Module } from '@nestjs/common';
import { OriginController } from './controllers/origin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YerbaMate } from '../shared/entities/yerba-mate.entity';
import { Country } from '../shared/entities/country.entity';
import { Origin } from '../shared/entities/origin.entity';
import { OriginService } from './services/origin.service';

@Module({
  imports: [TypeOrmModule.forFeature([Origin, YerbaMate, Country])],
  controllers: [OriginController],
  providers: [OriginService],
})
export class OriginModule {}
