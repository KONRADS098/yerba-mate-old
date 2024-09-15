import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotFoundException } from '@nestjs/common';
import { UserFlavorVote } from '../../../shared/entities/user-vote.entity';
import { UpdateUserFlavorVoteDto } from '../dtos/update-user-flavor-vote.dto';
import { CreateUserFlavorVoteDto } from '../dtos/create-user-flavor-vote.dto';
import { UserFlavorVoteService } from './user-flavor-vote.service';

describe('UserFlavorVoteService', () => {
  let service: UserFlavorVoteService;
  let flavorVoteRepository: Repository<UserFlavorVote>;

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserFlavorVoteService,
        {
          provide: getRepositoryToken(UserFlavorVote),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserFlavorVoteService>(UserFlavorVoteService);
    flavorVoteRepository = module.get<Repository<UserFlavorVote>>(
      getRepositoryToken(UserFlavorVote),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Flavor Vote Methods
  describe('createFlavorVote', () => {
    it('should create and save a flavor vote', async () => {
      const createDto: CreateUserFlavorVoteDto = {
        userId: 1,
        yerbaMateId: 1,
        flavorId: 1,
        score: 5,
      };
      const vote = { id: 1, ...createDto };

      jest.spyOn(flavorVoteRepository, 'create').mockReturnValue(vote as any);
      jest.spyOn(flavorVoteRepository, 'save').mockResolvedValue(vote as any);

      expect(await service.createFlavorVote(createDto)).toEqual(vote);
      expect(flavorVoteRepository.create).toHaveBeenCalledWith(createDto);
      expect(flavorVoteRepository.save).toHaveBeenCalledWith(vote);
    });
  });

  describe('findAllFlavorVotes', () => {
    it('should return an array of flavor votes', async () => {
      const votes = [
        { id: 1, userId: 1, yerbaMateId: 1, flavorId: 1, score: 5 },
      ];
      jest.spyOn(flavorVoteRepository, 'find').mockResolvedValue(votes as any);

      expect(await service.findAllFlavorVotes()).toEqual(votes);
      expect(flavorVoteRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOneFlavorVote', () => {
    it('should return a flavor vote by ID', async () => {
      const vote = { id: 1, userId: 1, yerbaMateId: 1, flavorId: 1, score: 5 };
      jest
        .spyOn(flavorVoteRepository, 'findOne')
        .mockResolvedValue(vote as any);

      expect(await service.findOneFlavorVote(1)).toEqual(vote);
      expect(flavorVoteRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException if flavor vote not found', async () => {
      jest.spyOn(flavorVoteRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOneFlavorVote(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateFlavorVote', () => {
    it('should update a flavor vote', async () => {
      const updateDto: UpdateUserFlavorVoteDto = { score: 4 };
      const vote = { id: 1, userId: 1, yerbaMateId: 1, score: 4 };

      jest
        .spyOn(flavorVoteRepository, 'update')
        .mockResolvedValue({ affected: 1 } as any);
      jest.spyOn(service, 'findOneFlavorVote').mockResolvedValue(vote as any);

      expect(await service.updateFlavorVote(1, updateDto)).toEqual(vote);
      expect(flavorVoteRepository.update).toHaveBeenCalledWith(1, updateDto);
      expect(service.findOneFlavorVote).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if flavor vote not found', async () => {
      const updateDto: UpdateUserFlavorVoteDto = { score: 4 };

      jest
        .spyOn(flavorVoteRepository, 'update')
        .mockResolvedValue({ affected: 0 } as any);

      await expect(service.updateFlavorVote(1, updateDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('removeFlavorVote', () => {
    it('should remove a flavor vote', async () => {
      jest
        .spyOn(flavorVoteRepository, 'delete')
        .mockResolvedValue({ affected: 1 } as any);

      await service.removeFlavorVote(1);
      expect(flavorVoteRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if flavor vote not found', async () => {
      jest
        .spyOn(flavorVoteRepository, 'delete')
        .mockResolvedValue({ affected: 0 } as any);

      await expect(service.removeFlavorVote(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
