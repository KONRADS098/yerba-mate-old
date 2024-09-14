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

import { plainToClass } from 'class-transformer';
import {
  CreateProcessingMethodDto,
  ProcessingMethodResponseDto,
  UpdateProcessingMethodDto,
} from '@shared/dto/processing-method.dto';

@Controller('processing-method')
export class ProcessingMethodController {
  constructor(
    private readonly processingMethodService: ProcessingMethodService,
  ) {}

  @Post()
  async create(
    @Body() createProcessingMethodDto: CreateProcessingMethodDto,
  ): Promise<ProcessingMethodResponseDto> {
    const processingMethod = await this.processingMethodService.create(
      createProcessingMethodDto,
    );
    return plainToClass(ProcessingMethodResponseDto, processingMethod);
  }

  @Get()
  async findAll(): Promise<ProcessingMethodResponseDto[]> {
    const processingMethods = await this.processingMethodService.findAll();
    return processingMethods.map((processingMethod) =>
      plainToClass(ProcessingMethodResponseDto, processingMethod),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ProcessingMethodResponseDto> {
    const processingMethod = await this.processingMethodService.findOne(id);
    return plainToClass(ProcessingMethodResponseDto, processingMethod);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProcessingMethodDto: UpdateProcessingMethodDto,
  ): Promise<ProcessingMethodResponseDto> {
    const processingMethod = await this.processingMethodService.update(
      id,
      updateProcessingMethodDto,
    );
    return plainToClass(ProcessingMethodResponseDto, processingMethod);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.processingMethodService.remove(id);
  }
}
