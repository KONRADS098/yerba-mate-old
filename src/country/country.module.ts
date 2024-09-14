import { Module } from '@nestjs/common';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './country.entity';
import { Brand } from '../brand/brand.entity';
import { Origin } from '../origin/origin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Country, Brand, Origin])],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}
