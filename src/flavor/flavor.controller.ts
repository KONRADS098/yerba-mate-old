import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { FlavorService } from './flavor.service';

import { plainToClass } from 'class-transformer';
import {
  CreateFlavorDto,
  FlavorResponseDto,
  UpdateFlavorDto,
} from '@shared/dto/flavor.dto';

@Controller('flavor')
export class FlavorController {
  constructor(private readonly flavorService: FlavorService) {}

  @Post()
  async create(
    @Body() createFlavorDto: CreateFlavorDto,
  ): Promise<FlavorResponseDto> {
    const flavor = await this.flavorService.create(createFlavorDto);
    return plainToClass(FlavorResponseDto, flavor);
  }

  @Get()
  async findAll(): Promise<FlavorResponseDto[]> {
    const flavors = await this.flavorService.findAll();
    return flavors.map((flavor) => plainToClass(FlavorResponseDto, flavor));
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<FlavorResponseDto> {
    const flavor = await this.flavorService.findOne(id);
    return plainToClass(FlavorResponseDto, flavor);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateFlavorDto: UpdateFlavorDto,
  ): Promise<FlavorResponseDto> {
    const flavor = await this.flavorService.update(id, updateFlavorDto);
    return plainToClass(FlavorResponseDto, flavor);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.flavorService.remove(id);
  }
}
