import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { plainToInstance } from 'class-transformer';
import {
  CreateBrandDto,
  BrandResponseDto,
  UpdateBrandDto,
} from '@shared/dto/brand.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('brand')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new brand' })
  @ApiResponse({
    status: 201,
    description: 'The brand has been successfully created.',
    type: BrandResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(
    @Body() createBrandDto: CreateBrandDto,
  ): Promise<BrandResponseDto> {
    const brand = await this.brandService.create(createBrandDto);
    return plainToInstance(BrandResponseDto, brand);
  }

  @Get()
  @ApiOperation({ summary: 'Get all brands' })
  @ApiResponse({
    status: 200,
    description: 'Return all brands.',
    type: [BrandResponseDto],
  })
  async findAll(): Promise<BrandResponseDto[]> {
    const brands = await this.brandService.findAll();
    return brands.map((brand) => plainToInstance(BrandResponseDto, brand));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a brand by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the brand with the given ID.',
    type: BrandResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Brand not found.' })
  async findOne(@Param('id') id: number): Promise<BrandResponseDto> {
    const brand = await this.brandService.findOne(id);
    return plainToInstance(BrandResponseDto, brand);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a brand by ID' })
  @ApiResponse({
    status: 200,
    description: 'The brand has been successfully updated.',
    type: BrandResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Brand not found.' })
  async update(
    @Param('id') id: number,
    @Body() updateBrandDto: UpdateBrandDto,
  ): Promise<BrandResponseDto> {
    const brand = await this.brandService.update(id, updateBrandDto);
    return plainToInstance(BrandResponseDto, brand);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a brand by ID' })
  @ApiResponse({
    status: 200,
    description: 'The brand has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Brand not found.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.brandService.remove(id);
  }
}
