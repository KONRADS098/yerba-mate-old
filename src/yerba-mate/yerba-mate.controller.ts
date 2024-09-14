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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('yerba-mate')
@Controller('yerba-mate')
export class YerbaMateController {
  constructor(private readonly yerbaMateService: YerbaMateService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new yerba mate' })
  @ApiResponse({
    status: 201,
    description: 'The yerba mate has been successfully created.',
    type: YerbaMateResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(
    @Body() createYerbaMateDto: CreateYerbaMateDto,
  ): Promise<YerbaMateResponseDto> {
    const yerbaMate = await this.yerbaMateService.create(createYerbaMateDto);
    return plainToClass(YerbaMateResponseDto, yerbaMate);
  }

  @Get()
  @ApiOperation({ summary: 'Get all yerba mates' })
  @ApiResponse({
    status: 200,
    description: 'Return all yerba mates.',
    type: [YerbaMateResponseDto],
  })
  async findAll(): Promise<YerbaMateResponseDto[]> {
    const yerbaMates = await this.yerbaMateService.findAll();
    return yerbaMates.map((yerbaMate) =>
      plainToClass(YerbaMateResponseDto, yerbaMate),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a yerba mate by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the yerba mate with the given ID.',
    type: YerbaMateResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Yerba mate not found.' })
  async findOne(@Param('id') id: number): Promise<YerbaMateResponseDto> {
    const yerbaMate = await this.yerbaMateService.findOne(id);
    return plainToClass(YerbaMateResponseDto, yerbaMate);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a yerba mate by ID' })
  @ApiResponse({
    status: 200,
    description: 'The yerba mate has been successfully updated.',
    type: YerbaMateResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Yerba mate not found.' })
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
  @ApiOperation({ summary: 'Delete a yerba mate by ID' })
  @ApiResponse({
    status: 200,
    description: 'The yerba mate has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Yerba mate not found.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.yerbaMateService.remove(id);
  }
}
