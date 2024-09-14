import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProcessingMethodService } from './processing-method.service';
import { plainToInstance } from 'class-transformer';

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  CreateProcessingMethodDto,
  ProcessingMethodResponseDto,
  UpdateProcessingMethodDto,
} from './processing-method.dto';

@ApiTags('processing-method')
@Controller('processing-method')
export class ProcessingMethodController {
  constructor(
    private readonly processingMethodService: ProcessingMethodService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new processing method' })
  @ApiResponse({
    status: 201,
    description: 'The processing method has been successfully created.',
    type: ProcessingMethodResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(
    @Body() createProcessingMethodDto: CreateProcessingMethodDto,
  ): Promise<ProcessingMethodResponseDto> {
    const processingMethod = await this.processingMethodService.create(
      createProcessingMethodDto,
    );
    return plainToInstance(ProcessingMethodResponseDto, processingMethod);
  }

  @Get()
  @ApiOperation({ summary: 'Get all processing methods' })
  @ApiResponse({
    status: 200,
    description: 'Return all processing methods.',
    type: [ProcessingMethodResponseDto],
  })
  async findAll(): Promise<ProcessingMethodResponseDto[]> {
    const processingMethods = await this.processingMethodService.findAll();
    return processingMethods.map((processingMethod) =>
      plainToInstance(ProcessingMethodResponseDto, processingMethod),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a processing method by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the processing method with the given ID.',
    type: ProcessingMethodResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Processing method not found.' })
  async findOne(@Param('id') id: number): Promise<ProcessingMethodResponseDto> {
    const processingMethod = await this.processingMethodService.findOne(id);
    return plainToInstance(ProcessingMethodResponseDto, processingMethod);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a processing method by ID' })
  @ApiResponse({
    status: 200,
    description: 'The processing method has been successfully updated.',
    type: ProcessingMethodResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Processing method not found.' })
  async update(
    @Param('id') id: number,
    @Body() updateProcessingMethodDto: UpdateProcessingMethodDto,
  ): Promise<ProcessingMethodResponseDto> {
    const processingMethod = await this.processingMethodService.update(
      id,
      updateProcessingMethodDto,
    );
    return plainToInstance(ProcessingMethodResponseDto, processingMethod);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a processing method by ID' })
  @ApiResponse({
    status: 200,
    description: 'The processing method has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Processing method not found.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.processingMethodService.remove(id);
  }
}
