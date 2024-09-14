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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('country')
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new country' })
  @ApiResponse({
    status: 201,
    description: 'The country has been successfully created.',
    type: CountryResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(
    @Body() createCountryDto: CreateCountryDto,
  ): Promise<CountryResponseDto> {
    const country = await this.countryService.create(createCountryDto);
    return plainToClass(CountryResponseDto, country);
  }

  @Get()
  @ApiOperation({ summary: 'Get all countries' })
  @ApiResponse({
    status: 200,
    description: 'Return all countries.',
    type: [CountryResponseDto],
  })
  async findAll(): Promise<CountryResponseDto[]> {
    const countries = await this.countryService.findAll();
    return countries.map((country) =>
      plainToClass(CountryResponseDto, country),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a country by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the country with the given ID.',
    type: CountryResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Country not found.' })
  async findOne(@Param('id') id: number): Promise<CountryResponseDto> {
    const country = await this.countryService.findOne(id);
    return plainToClass(CountryResponseDto, country);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a country by ID' })
  @ApiResponse({
    status: 200,
    description: 'The country has been successfully updated.',
    type: CountryResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Country not found.' })
  async update(
    @Param('id') id: number,
    @Body() updateCountryDto: UpdateCountryDto,
  ): Promise<CountryResponseDto> {
    const country = await this.countryService.update(id, updateCountryDto);
    return plainToClass(CountryResponseDto, country);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a country by ID' })
  @ApiResponse({
    status: 200,
    description: 'The country has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Country not found.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.countryService.remove(id);
  }
}
