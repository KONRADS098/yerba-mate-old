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
import { plainToInstance } from 'class-transformer';
import {
  CreateFlavorDto,
  FlavorResponseDto,
  UpdateFlavorDto,
} from '@shared/dto/flavor.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('flavor')
@Controller('flavor')
export class FlavorController {
  constructor(private readonly flavorService: FlavorService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new flavor' })
  @ApiResponse({
    status: 201,
    description: 'The flavor has been successfully created.',
    type: FlavorResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(
    @Body() createFlavorDto: CreateFlavorDto,
  ): Promise<FlavorResponseDto> {
    const flavor = await this.flavorService.create(createFlavorDto);
    return plainToInstance(FlavorResponseDto, flavor);
  }

  @Get()
  @ApiOperation({ summary: 'Get all flavors' })
  @ApiResponse({
    status: 200,
    description: 'Return all flavors.',
    type: [FlavorResponseDto],
  })
  async findAll(): Promise<FlavorResponseDto[]> {
    const flavors = await this.flavorService.findAll();
    return flavors.map((flavor) => plainToInstance(FlavorResponseDto, flavor));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a flavor by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the flavor with the given ID.',
    type: FlavorResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Flavor not found.' })
  async findOne(@Param('id') id: number): Promise<FlavorResponseDto> {
    const flavor = await this.flavorService.findOne(id);
    return plainToInstance(FlavorResponseDto, flavor);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a flavor by ID' })
  @ApiResponse({
    status: 200,
    description: 'The flavor has been successfully updated.',
    type: FlavorResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Flavor not found.' })
  async update(
    @Param('id') id: number,
    @Body() updateFlavorDto: UpdateFlavorDto,
  ): Promise<FlavorResponseDto> {
    const flavor = await this.flavorService.update(id, updateFlavorDto);
    return plainToInstance(FlavorResponseDto, flavor);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a flavor by ID' })
  @ApiResponse({
    status: 200,
    description: 'The flavor has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Flavor not found.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.flavorService.remove(id);
  }
}
