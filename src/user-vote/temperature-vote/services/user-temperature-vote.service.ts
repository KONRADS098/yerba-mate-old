import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTemperatureVote } from '../../../shared/entities/user-vote.entity';
import { Repository } from 'typeorm';
import { CreateUserTemperatureVoteDto } from '../dtos/create-user-temperature-vote.dto';
import { UpdateUserTemperatureVoteDto } from '../dtos/update-user-temperature-vote.dto';

@Injectable()
export class UserTemperatureVoteService {
  constructor(
    @InjectRepository(UserTemperatureVote)
    private readonly temperatureVoteRepository: Repository<UserTemperatureVote>,
  ) {}

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
