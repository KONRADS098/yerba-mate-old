import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateOriginDto } from '../dtos/create-origin.dto';
import { OriginResponseDto } from '../dtos/origin-response.dto';
import { UpdateOriginDto } from '../dtos/update-origin.dto';
import { OriginService } from '../services/origin.service';

@ApiTags('origin')
@Controller('origin')
export class OriginController {
  constructor(private readonly originService: OriginService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new origin' })
  @ApiResponse({
    status: 201,
    description: 'The origin has been successfully created.',
    type: OriginResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(
    @Body() createOriginDto: CreateOriginDto,
  ): Promise<OriginResponseDto> {
    const origin = await this.originService.create(createOriginDto);
    return plainToInstance(OriginResponseDto, origin);
  }

  @Get()
  @ApiOperation({ summary: 'Get all origins' })
  @ApiResponse({
    status: 200,
    description: 'Return all origins.',
    type: [OriginResponseDto],
  })
  async findAll(): Promise<OriginResponseDto[]> {
    const origins = await this.originService.findAll();
    return origins.map((origin) => plainToInstance(OriginResponseDto, origin));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an origin by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the origin with the given ID.',
    type: OriginResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Origin not found.' })
  async findOne(@Param('id') id: number): Promise<OriginResponseDto> {
    const origin = await this.originService.findOne(id);
    return plainToInstance(OriginResponseDto, origin);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an origin by ID' })
  @ApiResponse({
    status: 200,
    description: 'The origin has been successfully updated.',
    type: OriginResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Origin not found.' })
  async update(
    @Param('id') id: number,
    @Body() updateOriginDto: UpdateOriginDto,
  ): Promise<OriginResponseDto> {
    const origin = await this.originService.update(id, updateOriginDto);
    return plainToInstance(OriginResponseDto, origin);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an origin by ID' })
  @ApiResponse({
    status: 200,
    description: 'The origin has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Origin not found.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.originService.remove(id);
  }
}
