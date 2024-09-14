import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { YerbaMateService } from './yerba-mate.service';

import { plainToClass } from 'class-transformer';
import {
  CreateYerbaMateDto,
  YerbaMateResponseDto,
  UpdateYerbaMateDto,
} from '@shared/dto/yerba-mate.dto';

@Controller('yerba-mate')
export class YerbaMateController {
  constructor(private readonly yerbaMateService: YerbaMateService) {}

  @Post()
  async create(
    @Body() createYerbaMateDto: CreateYerbaMateDto,
  ): Promise<YerbaMateResponseDto> {
    const yerbaMate = await this.yerbaMateService.create(createYerbaMateDto);
    return plainToClass(YerbaMateResponseDto, yerbaMate);
  }

  @Get()
  async findAll(): Promise<YerbaMateResponseDto[]> {
    const yerbaMates = await this.yerbaMateService.findAll();
    return yerbaMates.map((yerbaMate) =>
      plainToClass(YerbaMateResponseDto, yerbaMate),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<YerbaMateResponseDto> {
    const yerbaMate = await this.yerbaMateService.findOne(id);
    return plainToClass(YerbaMateResponseDto, yerbaMate);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateYerbaMateDto: UpdateYerbaMateDto,
  ): Promise<YerbaMateResponseDto> {
    const yerbaMate = await this.yerbaMateService.update(
      id,
      updateYerbaMateDto,
    );
    return plainToClass(YerbaMateResponseDto, yerbaMate);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.yerbaMateService.remove(id);
  }
}
