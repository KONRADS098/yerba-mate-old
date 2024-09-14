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

@Controller('origin')
export class OriginController {
  constructor(private readonly originService: OriginService) {}

  @Post()
  async create(
    @Body() createOriginDto: CreateOriginDto,
  ): Promise<OriginResponseDto> {
    const origin = await this.originService.create(createOriginDto);
    return plainToClass(OriginResponseDto, origin);
  }

  @Get()
  async findAll(): Promise<OriginResponseDto[]> {
    const origins = await this.originService.findAll();
    return origins.map((origin) => plainToClass(OriginResponseDto, origin));
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<OriginResponseDto> {
    const origin = await this.originService.findOne(id);
    return plainToClass(OriginResponseDto, origin);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateOriginDto: UpdateOriginDto,
  ): Promise<OriginResponseDto> {
    const origin = await this.originService.update(id, updateOriginDto);
    return plainToClass(OriginResponseDto, origin);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.originService.remove(id);
  }
}
