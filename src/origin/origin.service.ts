import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Origin } from '../shared/entities/origin.entity';
import { CreateOriginDto, UpdateOriginDto } from './origin.dto';

@Injectable()
export class OriginService {
  constructor(
    @InjectRepository(Origin)
    private readonly originRepository: Repository<Origin>,
  ) {}

  async create(createOriginDto: CreateOriginDto): Promise<Origin> {
    const origin = this.originRepository.create(createOriginDto);
    return this.originRepository.save(origin);
  }

  async findAll(): Promise<Origin[]> {
    return this.originRepository.find({ relations: ['yerbaMates'] });
  }

  async findOne(id: number): Promise<Origin> {
    const origin = await this.originRepository.findOne({
      where: { id },
      relations: ['yerbaMates'],
    });
    if (!origin) {
      throw new NotFoundException(`Origin with ID ${id} not found`);
    }
    return origin;
  }

  async update(id: number, updateOriginDto: UpdateOriginDto): Promise<Origin> {
    await this.originRepository.update(id, updateOriginDto);
    const updatedOrigin = await this.findOne(id);
    return updatedOrigin;
  }

  async remove(id: number): Promise<void> {
    const result = await this.originRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Origin with ID ${id} not found`);
    }
  }
}
