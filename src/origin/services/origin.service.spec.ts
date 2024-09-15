import { Test, TestingModule } from '@nestjs/testing';
import { OriginService } from './origin.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Origin } from '../../shared/entities/origin.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateOriginDto } from '../dtos/create-origin.dto';
import { UpdateOriginDto } from '../dtos/update-origin.dto';

describe('OriginService', () => {
  let service: OriginService;
  let repository: Repository<Origin>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OriginService,
        {
          provide: getRepositoryToken(Origin),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<OriginService>(OriginService);
    repository = module.get<Repository<Origin>>(getRepositoryToken(Origin));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save an origin', async () => {
      const createOriginDto: CreateOriginDto = {
        name: 'Test Origin',
        countryId: 1,
        region: 'Test Region',
        description: 'Test Description',
      };
      const origin = { id: 1, ...createOriginDto };

      jest.spyOn(repository, 'create').mockReturnValue(origin as any);
      jest.spyOn(repository, 'save').mockResolvedValue(origin as any);

      expect(await service.create(createOriginDto)).toEqual(origin);
      expect(repository.create).toHaveBeenCalledWith(createOriginDto);
      expect(repository.save).toHaveBeenCalledWith(origin);
    });
  });

  describe('findAll', () => {
    it('should return an array of origins', async () => {
      const origins = [{ id: 1, name: 'Test Origin' }];
      jest.spyOn(repository, 'find').mockResolvedValue(origins as any);

      expect(await service.findAll()).toEqual(origins);
      expect(repository.find).toHaveBeenCalledWith({
        relations: ['yerbaMates'],
      });
    });
  });

  describe('findOne', () => {
    it('should return an origin by ID', async () => {
      const origin = { id: 1, name: 'Test Origin' };
      jest.spyOn(repository, 'findOne').mockResolvedValue(origin as any);

      expect(await service.findOne(1)).toEqual(origin);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['yerbaMates'],
      });
    });

    it('should throw NotFoundException if origin not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an origin', async () => {
      const updateOriginDto: UpdateOriginDto = { name: 'Updated Origin' };
      const origin = { id: 1, ...updateOriginDto };

      jest
        .spyOn(repository, 'update')
        .mockResolvedValue({ affected: 1 } as any);
      jest.spyOn(service, 'findOne').mockResolvedValue(origin as any);

      expect(await service.update(1, updateOriginDto)).toEqual(origin);
      expect(repository.update).toHaveBeenCalledWith(1, updateOriginDto);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if origin not found', async () => {
      const updateOriginDto: UpdateOriginDto = { name: 'Updated Origin' };

      jest
        .spyOn(repository, 'update')
        .mockResolvedValue({ affected: 0 } as any);

      await expect(service.update(1, updateOriginDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove an origin', async () => {
      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ affected: 1 } as any);

      await service.remove(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if origin not found', async () => {
      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ affected: 0 } as any);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
