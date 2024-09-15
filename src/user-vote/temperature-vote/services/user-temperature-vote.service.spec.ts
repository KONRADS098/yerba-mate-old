import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotFoundException } from '@nestjs/common';
import { UserTemperatureVoteService } from './user-temperature-vote.service';
import { UserTemperatureVote } from '../../../shared/entities/user-vote.entity';
import { CreateUserTemperatureVoteDto } from '../dtos/create-user-temperature-vote.dto';
import { UpdateUserTemperatureVoteDto } from '../dtos/update-user-temperature-vote.dto';

describe('UserVoteService', () => {
  let service: UserTemperatureVoteService;
  let temperatureVoteRepository: Repository<UserTemperatureVote>;

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
        UserTemperatureVoteService,
        {
          provide: getRepositoryToken(UserTemperatureVote),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserTemperatureVoteService>(
      UserTemperatureVoteService,
    );

    temperatureVoteRepository = module.get<Repository<UserTemperatureVote>>(
      getRepositoryToken(UserTemperatureVote),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTemperatureVote', () => {
    it('should create and save a temperature vote', async () => {
      const createDto: CreateUserTemperatureVoteDto = {
        userId: 1,
        yerbaMateId: 1,
        temperature: 100,
      };
      const vote = { id: 1, ...createDto };

      jest
        .spyOn(temperatureVoteRepository, 'create')
        .mockReturnValue(vote as any);
      jest
        .spyOn(temperatureVoteRepository, 'save')
        .mockResolvedValue(vote as any);

      expect(await service.createTemperatureVote(createDto)).toEqual(vote);
      expect(temperatureVoteRepository.create).toHaveBeenCalledWith(createDto);
      expect(temperatureVoteRepository.save).toHaveBeenCalledWith(vote);
    });
  });

  describe('findAllTemperatureVotes', () => {
    it('should return an array of temperature votes', async () => {
      const votes = [{ id: 1, userId: 1, yerbaMateId: 1, temperature: 100 }];
      jest
        .spyOn(temperatureVoteRepository, 'find')
        .mockResolvedValue(votes as any);

      expect(await service.findAllTemperatureVotes()).toEqual(votes);
      expect(temperatureVoteRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOneTemperatureVote', () => {
    it('should return a temperature vote by ID', async () => {
      const vote = { id: 1, userId: 1, yerbaMateId: 1, temperature: 100 };
      jest
        .spyOn(temperatureVoteRepository, 'findOne')
        .mockResolvedValue(vote as any);

      expect(await service.findOneTemperatureVote(1)).toEqual(vote);
      expect(temperatureVoteRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException if temperature vote not found', async () => {
      jest.spyOn(temperatureVoteRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOneTemperatureVote(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateTemperatureVote', () => {
    it('should update a temperature vote', async () => {
      const updateDto: UpdateUserTemperatureVoteDto = { temperature: 100 };
      const vote = { id: 1, userId: 1, yerbaMateId: 1, temperature: 100 };

      jest
        .spyOn(temperatureVoteRepository, 'update')
        .mockResolvedValue({ affected: 1 } as any);
      jest
        .spyOn(service, 'findOneTemperatureVote')
        .mockResolvedValue(vote as any);

      expect(await service.updateTemperatureVote(1, updateDto)).toEqual(vote);
      expect(temperatureVoteRepository.update).toHaveBeenCalledWith(
        1,
        updateDto,
      );
      expect(service.findOneTemperatureVote).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if temperature vote not found', async () => {
      const updateDto: UpdateUserTemperatureVoteDto = { temperature: 100 };

      jest
        .spyOn(temperatureVoteRepository, 'update')
        .mockResolvedValue({ affected: 0 } as any);

      await expect(service.updateTemperatureVote(1, updateDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('removeTemperatureVote', () => {
    it('should remove a temperature vote', async () => {
      jest
        .spyOn(temperatureVoteRepository, 'delete')
        .mockResolvedValue({ affected: 1 } as any);

      await service.removeTemperatureVote(1);
      expect(temperatureVoteRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if temperature vote not found', async () => {
      jest
        .spyOn(temperatureVoteRepository, 'delete')
        .mockResolvedValue({ affected: 0 } as any);

      await expect(service.removeTemperatureVote(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
