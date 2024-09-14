import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { OriginService } from './origin.service';
import { plainToClass } from 'class-transformer';
import {
  CreateOriginDto,
  OriginResponseDto,
  UpdateOriginDto,
} from '@shared/dto/origin.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

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
    return plainToClass(OriginResponseDto, origin);
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
    return origins.map((origin) => plainToClass(OriginResponseDto, origin));
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
    return plainToClass(OriginResponseDto, origin);
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
    return plainToClass(OriginResponseDto, origin);
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
