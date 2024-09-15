import { Module } from '@nestjs/common';
import { BrandService } from './services/brand.service';
import { BrandController } from './controllers/brand.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from '../shared/entities/brand.entity';
import { Country } from '../shared/entities/country.entity';
import { YerbaMate } from '../shared/entities/yerba-mate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Brand, Country, YerbaMate])],
  providers: [BrandService],
  controllers: [BrandController],
})
export class BrandModule {}
