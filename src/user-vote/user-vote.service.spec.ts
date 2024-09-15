import { Test, TestingModule } from '@nestjs/testing';
import { UserVoteService } from './user-vote.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  UserFlavorVote,
  UserLongevityVote,
  UserTemperatureVote,
} from '../shared/entities/user-vote.entity';
import { NotFoundException } from '@nestjs/common';
import {
  CreateUserFlavorVoteDto,
  UpdateUserFlavorVoteDto,
  CreateUserLongevityVoteDto,
  UpdateUserLongevityVoteDto,
  CreateUserTemperatureVoteDto,
  UpdateUserTemperatureVoteDto,
} from './user-vote.dto';

describe('UserVoteService', () => {
  let service: UserVoteService;
  let flavorVoteRepository: Repository<UserFlavorVote>;
  let longevityVoteRepository: Repository<UserLongevityVote>;
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
        UserVoteService,
        {
          provide: getRepositoryToken(UserFlavorVote),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(UserLongevityVote),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(UserTemperatureVote),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserVoteService>(UserVoteService);
    flavorVoteRepository = module.get<Repository<UserFlavorVote>>(
      getRepositoryToken(UserFlavorVote),
    );
    longevityVoteRepository = module.get<Repository<UserLongevityVote>>(
      getRepositoryToken(UserLongevityVote),
    );
    temperatureVoteRepository = module.get<Repository<UserTemperatureVote>>(
      getRepositoryToken(UserTemperatureVote),
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

  // Longevity Vote Methods
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

  // Temperature Vote Methods
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
