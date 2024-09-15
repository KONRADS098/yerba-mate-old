import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserLongevityVoteDto } from '../dtos/update-user-longevity-vote.dto';
import { UserLongevityVote } from '../../../shared/entities/user-vote.entity';
import { CreateUserLongevityVoteDto } from '../dtos/create-user-longevity-vote.dto';

@Injectable()
export class UserLongevityVoteService {
  constructor(
    @InjectRepository(UserLongevityVote)
    private readonly longevityVoteRepository: Repository<UserLongevityVote>,
  ) {}

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
}
