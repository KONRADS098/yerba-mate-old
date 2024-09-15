import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserFlavorVoteDto } from '../dtos/update-user-flavor-vote.dto';
import { CreateUserFlavorVoteDto } from '../dtos/create-user-flavor-vote.dto';
import { UserFlavorVote } from '../../../shared/entities/user-vote.entity';

@Injectable()
export class UserFlavorVoteService {
  constructor(
    @InjectRepository(UserFlavorVote)
    private readonly flavorVoteRepository: Repository<UserFlavorVote>,
  ) {}

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
}
