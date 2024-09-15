import { Module } from '@nestjs/common';
import { CountryController } from './controllers/country.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from '../shared/entities/country.entity';
import { Brand } from '../shared/entities/brand.entity';
import { Origin } from '../shared/entities/origin.entity';
import { CountryService } from './services/country.service';

@Module({
  imports: [TypeOrmModule.forFeature([Country, Brand, Origin])],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}
