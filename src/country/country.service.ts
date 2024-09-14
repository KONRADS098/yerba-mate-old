import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from '../shared/entities/country.entity';
import { CreateCountryDto, UpdateCountryDto } from './country.dto';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async create(createCountryDto: CreateCountryDto): Promise<Country> {
    const country = this.countryRepository.create(createCountryDto);
    return this.countryRepository.save(country);
  }

  async findAll(): Promise<Country[]> {
    return this.countryRepository.find({ relations: ['brands', 'origins'] });
  }

  async findOne(id: number): Promise<Country> {
    const country = await this.countryRepository.findOne({
      where: { id },
      relations: ['brands', 'origins'],
    });
    if (!country) {
      throw new NotFoundException(`Country with ID ${id} not found`);
    }
    return country;
  }

  async update(
    id: number,
    updateCountryDto: UpdateCountryDto,
  ): Promise<Country> {
    await this.countryRepository.update(id, updateCountryDto);
    const updatedCountry = await this.findOne(id);
    return updatedCountry;
  }

  async remove(id: number): Promise<void> {
    const result = await this.countryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Country with ID ${id} not found`);
    }
  }
}
