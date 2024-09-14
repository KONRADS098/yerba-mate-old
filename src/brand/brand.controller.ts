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
import { plainToClass } from 'class-transformer';
import {
  BrandResponseDto,
  CreateBrandDto,
  UpdateBrandDto,
} from '@shared/dto/brand.dto';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  async create(
    @Body() createBrandDto: CreateBrandDto,
  ): Promise<BrandResponseDto> {
    const brand = await this.brandService.create(createBrandDto);
    return plainToClass(BrandResponseDto, brand);
  }

  @Get()
  async findAll(): Promise<BrandResponseDto[]> {
    const brands = await this.brandService.findAll();
    return brands.map((brand) => plainToClass(BrandResponseDto, brand));
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<BrandResponseDto> {
    const brand = await this.brandService.findOne(id);
    return plainToClass(BrandResponseDto, brand);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateBrandDto: UpdateBrandDto,
  ): Promise<BrandResponseDto> {
    const brand = await this.brandService.update(id, updateBrandDto);
    return plainToClass(BrandResponseDto, brand);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.brandService.remove(id);
  }
}
