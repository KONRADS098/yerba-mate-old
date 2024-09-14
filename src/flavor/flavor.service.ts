import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flavor } from './flavor.entity';
import { CreateFlavorDto, UpdateFlavorDto } from '@shared/dto/flavor.dto';

@Injectable()
export class FlavorService {
  constructor(
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}

  async create(createFlavorDto: CreateFlavorDto): Promise<Flavor> {
    const flavor = this.flavorRepository.create(createFlavorDto);
    return this.flavorRepository.save(flavor);
  }

  async findAll(): Promise<Flavor[]> {
    return this.flavorRepository.find({ relations: ['userFlavorVotes'] });
  }

  async findOne(id: number): Promise<Flavor> {
    const flavor = await this.flavorRepository.findOne({
      where: { id },
      relations: ['userFlavorVotes'],
    });
    if (!flavor) {
      throw new NotFoundException(`Flavor with ID ${id} not found`);
    }
    return flavor;
  }

  async update(id: number, updateFlavorDto: UpdateFlavorDto): Promise<Flavor> {
    await this.flavorRepository.update(id, updateFlavorDto);
    const updatedFlavor = await this.findOne(id);
    return updatedFlavor;
  }

  async remove(id: number): Promise<void> {
    const result = await this.flavorRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Flavor with ID ${id} not found`);
    }
  }
}
