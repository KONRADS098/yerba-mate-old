import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CountryService } from './country.service';

import { plainToClass } from 'class-transformer';
import {
  CreateCountryDto,
  CountryResponseDto,
  UpdateCountryDto,
} from '@shared/dto/country.dto';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  async create(
    @Body() createCountryDto: CreateCountryDto,
  ): Promise<CountryResponseDto> {
    const country = await this.countryService.create(createCountryDto);
    return plainToClass(CountryResponseDto, country);
  }

  @Get()
  async findAll(): Promise<CountryResponseDto[]> {
    const countries = await this.countryService.findAll();
    return countries.map((country) =>
      plainToClass(CountryResponseDto, country),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CountryResponseDto> {
    const country = await this.countryService.findOne(id);
    return plainToClass(CountryResponseDto, country);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCountryDto: UpdateCountryDto,
  ): Promise<CountryResponseDto> {
    const country = await this.countryService.update(id, updateCountryDto);
    return plainToClass(CountryResponseDto, country);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.countryService.remove(id);
  }
}
