import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './brand.entity';
import { Country } from '../country/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Brand, Country])],

  providers: [BrandService],
  controllers: [BrandController],
})
export class BrandModule {}
