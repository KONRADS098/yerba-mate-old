import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CreateUserFlavorVoteDto,
  UpdateUserFlavorVoteDto,
  CreateUserLongevityVoteDto,
  UpdateUserLongevityVoteDto,
  CreateUserTemperatureVoteDto,
  UpdateUserTemperatureVoteDto,
} from './user-vote.dto';
import {
  UserFlavorVote,
  UserLongevityVote,
  UserTemperatureVote,
} from '../shared/entities/user-vote.entity';

@Injectable()
export class UserVoteService {
  constructor(
    @InjectRepository(UserFlavorVote)
    private readonly flavorVoteRepository: Repository<UserFlavorVote>,
    @InjectRepository(UserLongevityVote)
    private readonly longevityVoteRepository: Repository<UserLongevityVote>,
    @InjectRepository(UserTemperatureVote)
    private readonly temperatureVoteRepository: Repository<UserTemperatureVote>,
  ) {}

  // Flavor Vote Methods
  async createFlavorVote(
    createDto: CreateUserFlavorVoteDto,
  ): Promise<UserFlavorVote> {
    const vote = this.flavorVoteRepository.create(createDto);
    return this.flavorVoteRepository.save(vote);
  }

  async findAllFlavorVotes(): Promise<UserFlavorVote[]> {
    return this.flavorVoteRepository.find();
  }

  async findOneFlavorVote(id: number): Promise<UserFlavorVote> {
    const vote = await this.flavorVoteRepository.findOne({ where: { id } });
    if (!vote) {
      throw new NotFoundException(`Flavor vote with ID ${id} not found`);
    }
    return vote;
  }

  async updateFlavorVote(
    id: number,
    updateDto: UpdateUserFlavorVoteDto,
  ): Promise<UserFlavorVote> {
    await this.flavorVoteRepository.update(id, updateDto);
    return this.findOneFlavorVote(id);
  }

  async removeFlavorVote(id: number): Promise<void> {
    const result = await this.flavorVoteRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Flavor vote with ID ${id} not found`);
    }
  }

  // Longevity Vote Methods
  async createLongevityVote(
    createDto: CreateUserLongevityVoteDto,
  ): Promise<UserLongevityVote> {
    const vote = this.longevityVoteRepository.create(createDto);
    return this.longevityVoteRepository.save(vote);
  }

  async findAllLongevityVotes(): Promise<UserLongevityVote[]> {
    return this.longevityVoteRepository.find();
  }

  async findOneLongevityVote(id: number): Promise<UserLongevityVote> {
    const vote = await this.longevityVoteRepository.findOne({ where: { id } });
    if (!vote) {
      throw new NotFoundException(`Longevity vote with ID ${id} not found`);
    }
    return vote;
  }

  async updateLongevityVote(
    id: number,
    updateDto: UpdateUserLongevityVoteDto,
  ): Promise<UserLongevityVote> {
    await this.longevityVoteRepository.update(id, updateDto);
    return this.findOneLongevityVote(id);
  }

  async removeLongevityVote(id: number): Promise<void> {
    const result = await this.longevityVoteRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Longevity vote with ID ${id} not found`);
    }
  }

  // Temperature Vote Methods
  async createTemperatureVote(
    createDto: CreateUserTemperatureVoteDto,
  ): Promise<UserTemperatureVote> {
    const vote = this.temperatureVoteRepository.create(createDto);
    return this.temperatureVoteRepository.save(vote);
  }

  async findAllTemperatureVotes(): Promise<UserTemperatureVote[]> {
    return this.temperatureVoteRepository.find();
  }

  async findOneTemperatureVote(id: number): Promise<UserTemperatureVote> {
    const vote = await this.temperatureVoteRepository.findOne({
      where: { id },
    });
    if (!vote) {
      throw new NotFoundException(`Temperature vote with ID ${id} not found`);
    }
    return vote;
  }

  async updateTemperatureVote(
    id: number,
    updateDto: UpdateUserTemperatureVoteDto,
  ): Promise<UserTemperatureVote> {
    await this.temperatureVoteRepository.update(id, updateDto);
    return this.findOneTemperatureVote(id);
  }

  async removeTemperatureVote(id: number): Promise<void> {
    const result = await this.temperatureVoteRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Temperature vote with ID ${id} not found`);
    }
  }
}
