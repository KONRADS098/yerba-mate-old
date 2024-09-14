import { Module } from '@nestjs/common';
import { OriginController } from './origin.controller';
import { OriginService } from './origin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YerbaMate } from '../yerba-mate/yerba-mate.entity';
import { Country } from '../country/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([YerbaMate, Country])],
  controllers: [OriginController],
  providers: [OriginService],
})
export class OriginModule {}
