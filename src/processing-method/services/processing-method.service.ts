import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProcessingMethod } from '../../shared/entities/processing-method.entity';
import { CreateProcessingMethodDto } from '../dtos/create-processing-method.dto';
import { UpdateProcessingMethodDto } from '../dtos/update-processing-method.dto';

@Injectable()
export class ProcessingMethodService {
  constructor(
    @InjectRepository(ProcessingMethod)
    private readonly processingMethodRepository: Repository<ProcessingMethod>,
  ) {}

  async create(
    createProcessingMethodDto: CreateProcessingMethodDto,
  ): Promise<ProcessingMethod> {
    const processingMethod = this.processingMethodRepository.create(
      createProcessingMethodDto,
    );
    return this.processingMethodRepository.save(processingMethod);
  }

  async findAll(): Promise<ProcessingMethod[]> {
    return this.processingMethodRepository.find({
      relations: ['yerbaMates'],
    });
  }

  async findOne(id: number): Promise<ProcessingMethod> {
    const processingMethod = await this.processingMethodRepository.findOne({
      where: { id },
      relations: ['yerbaMates'],
    });
    if (!processingMethod) {
      throw new NotFoundException(`ProcessingMethod with ID ${id} not found`);
    }
    return processingMethod;
  }

  async update(
    id: number,
    updateProcessingMethodDto: UpdateProcessingMethodDto,
  ): Promise<ProcessingMethod> {
    await this.processingMethodRepository.update(id, updateProcessingMethodDto);
    const updatedProcessingMethod = await this.findOne(id);
    return updatedProcessingMethod;
  }

  async remove(id: number): Promise<void> {
    const result = await this.processingMethodRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`ProcessingMethod with ID ${id} not found`);
    }
  }
}
