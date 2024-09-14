import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { YerbaMate } from './yerba-mate.entity';
import { ProcessingMethod } from '../processing-method/processing-method.entity';
import {
  CreateYerbaMateDto,
  UpdateYerbaMateDto,
} from '@shared/dto/yerba-mate.dto';

@Injectable()
export class YerbaMateService {
  constructor(
    @InjectRepository(YerbaMate)
    private readonly yerbaMateRepository: Repository<YerbaMate>,
    @InjectRepository(ProcessingMethod)
    private readonly processingMethodRepository: Repository<ProcessingMethod>,
  ) {}

  async create(createYerbaMateDto: CreateYerbaMateDto): Promise<YerbaMate> {
    const { processingMethodIds, ...yerbaMateData } = createYerbaMateDto;

    const processingMethods = await this.processingMethodRepository.findBy({
      id: In(processingMethodIds),
    });

    const yerbaMate = this.yerbaMateRepository.create({
      ...yerbaMateData,
      processingMethods,
    });
    return this.yerbaMateRepository.save(yerbaMate);
  }

  async findAll(): Promise<YerbaMate[]> {
    return this.yerbaMateRepository.find({
      relations: [
        'brand',
        'origin',
        'processingMethods',
        'userFlavorVotes',
        'userTemperatureVotes',
        'userLongevityVotes',
      ],
    });
  }

  async findOne(id: number): Promise<YerbaMate> {
    const yerbaMate = await this.yerbaMateRepository.findOne({
      where: { id },
      relations: [
        'brand',
        'origin',
        'processingMethods',
        'userFlavorVotes',
        'userTemperatureVotes',
        'userLongevityVotes',
      ],
    });
    if (!yerbaMate) {
      throw new NotFoundException(`YerbaMate with ID ${id} not found`);
    }
    return yerbaMate;
  }

  async update(
    id: number,
    updateYerbaMateDto: UpdateYerbaMateDto,
  ): Promise<YerbaMate> {
    const processingMethods = await this.processingMethodRepository.findByIds(
      updateYerbaMateDto.processingMethodIds,
    );
    await this.yerbaMateRepository.update(id, {
      ...updateYerbaMateDto,
      processingMethods,
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.yerbaMateRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`YerbaMate with ID ${id} not found`);
    }
  }
}
