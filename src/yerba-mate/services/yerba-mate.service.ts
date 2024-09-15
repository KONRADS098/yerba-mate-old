import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { YerbaMate } from '../../shared/entities/yerba-mate.entity';
import { ProcessingMethod } from '../../shared/entities/processing-method.entity';
import { CreateYerbaMateDto } from '../dtos/create-yerba-mate.dto';
import { UpdateYerbaMateDto } from '../dtos/update-yerba-mate.dto';

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
    const { processingMethodIds, ...yerbaMateData } = updateYerbaMateDto;

    const processingMethods = await this.processingMethodRepository.findBy({
      id: In(processingMethodIds),
    });
    await this.yerbaMateRepository.update(id, {
      ...yerbaMateData,
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
