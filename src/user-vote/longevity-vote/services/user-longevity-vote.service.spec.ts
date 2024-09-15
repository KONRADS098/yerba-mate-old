import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UserLongevityVote } from '../../../shared/entities/user-vote.entity';
import { UserLongevityVoteService } from './user-longevity-vote.service';
import { UpdateUserLongevityVoteDto } from '../dtos/update-user-longevity-vote.dto';
import { CreateUserLongevityVoteDto } from '../dtos/create-user-longevity-vote.dto';

describe('UserLongevityVoteService', () => {
  let service: UserLongevityVoteService;
  let longevityVoteRepository: Repository<UserLongevityVote>;

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
        UserLongevityVoteService,
        {
          provide: getRepositoryToken(UserLongevityVote),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserLongevityVoteService>(UserLongevityVoteService);
    longevityVoteRepository = module.get<Repository<UserLongevityVote>>(
      getRepositoryToken(UserLongevityVote),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createLongevityVote', () => {
    it('should create and save a longevity vote', async () => {
      const createDto: CreateUserLongevityVoteDto = {
        userId: 1,
        yerbaMateId: 1,
        liters: 5,
      };
      const vote = { id: 1, ...createDto };

      jest
        .spyOn(longevityVoteRepository, 'create')
        .mockReturnValue(vote as any);
      jest
        .spyOn(longevityVoteRepository, 'save')
        .mockResolvedValue(vote as any);

      expect(await service.createLongevityVote(createDto)).toEqual(vote);
      expect(longevityVoteRepository.create).toHaveBeenCalledWith(createDto);
      expect(longevityVoteRepository.save).toHaveBeenCalledWith(vote);
    });
  });

  describe('findAllLongevityVotes', () => {
    it('should return an array of longevity votes', async () => {
      const votes = [{ id: 1, userId: 1, yerbaMateId: 1, liters: 5 }];
      jest
        .spyOn(longevityVoteRepository, 'find')
        .mockResolvedValue(votes as any);

      expect(await service.findAllLongevityVotes()).toEqual(votes);
      expect(longevityVoteRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOneLongevityVote', () => {
    it('should return a longevity vote by ID', async () => {
      const vote = { id: 1, userId: 1, yerbaMateId: 1, liters: 5 };
      jest
        .spyOn(longevityVoteRepository, 'findOne')
        .mockResolvedValue(vote as any);

      expect(await service.findOneLongevityVote(1)).toEqual(vote);
      expect(longevityVoteRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException if longevity vote not found', async () => {
      jest.spyOn(longevityVoteRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOneLongevityVote(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateLongevityVote', () => {
    it('should update a longevity vote', async () => {
      const updateDto: UpdateUserLongevityVoteDto = { liters: 4 };
      const vote = { id: 1, userId: 1, yerbaMateId: 1, liters: 4 };

      jest
        .spyOn(longevityVoteRepository, 'update')
        .mockResolvedValue({ affected: 1 } as any);
      jest
        .spyOn(service, 'findOneLongevityVote')
        .mockResolvedValue(vote as any);

      expect(await service.updateLongevityVote(1, updateDto)).toEqual(vote);
      expect(longevityVoteRepository.update).toHaveBeenCalledWith(1, updateDto);
      expect(service.findOneLongevityVote).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if longevity vote not found', async () => {
      const updateDto: UpdateUserLongevityVoteDto = { liters: 4 };

      jest
        .spyOn(longevityVoteRepository, 'update')
        .mockResolvedValue({ affected: 0 } as any);

      await expect(service.updateLongevityVote(1, updateDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('removeLongevityVote', () => {
    it('should remove a longevity vote', async () => {
      jest
        .spyOn(longevityVoteRepository, 'delete')
        .mockResolvedValue({ affected: 1 } as any);

      await service.removeLongevityVote(1);
      expect(longevityVoteRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if longevity vote not found', async () => {
      jest
        .spyOn(longevityVoteRepository, 'delete')
        .mockResolvedValue({ affected: 0 } as any);

      await expect(service.removeLongevityVote(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
