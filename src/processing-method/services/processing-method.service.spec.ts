import { Test, TestingModule } from '@nestjs/testing';
import { ProcessingMethodService } from './processing-method.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { ProcessingMethod } from '../../shared/entities/processing-method.entity';
import { CreateProcessingMethodDto } from '../dtos/create-processing-method.dto';
import { UpdateProcessingMethodDto } from '../dtos/update-processing-method.dto';

describe('ProcessingMethodService', () => {
  let service: ProcessingMethodService;
  let repository: Repository<ProcessingMethod>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProcessingMethodService,
        {
          provide: getRepositoryToken(ProcessingMethod),
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

    service = module.get<ProcessingMethodService>(ProcessingMethodService);
    repository = module.get<Repository<ProcessingMethod>>(
      getRepositoryToken(ProcessingMethod),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a processing method', async () => {
      const createProcessingMethodDto: CreateProcessingMethodDto = {
        name: 'Test Processing Method',
      };
      const processingMethod = { id: 1, ...createProcessingMethodDto };

      jest.spyOn(repository, 'create').mockReturnValue(processingMethod as any);
      jest.spyOn(repository, 'save').mockResolvedValue(processingMethod as any);

      expect(await service.create(createProcessingMethodDto)).toEqual(
        processingMethod,
      );
      expect(repository.create).toHaveBeenCalledWith(createProcessingMethodDto);
      expect(repository.save).toHaveBeenCalledWith(processingMethod);
    });
  });

  describe('findAll', () => {
    it('should return an array of processing methods', async () => {
      const processingMethods = [{ id: 1, name: 'Test Processing Method' }];
      jest
        .spyOn(repository, 'find')
        .mockResolvedValue(processingMethods as any);

      expect(await service.findAll()).toEqual(processingMethods);
      expect(repository.find).toHaveBeenCalledWith({
        relations: ['yerbaMates'],
      });
    });
  });

  describe('findOne', () => {
    it('should return a processing method by ID', async () => {
      const processingMethod = { id: 1, name: 'Test Processing Method' };
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(processingMethod as any);

      expect(await service.findOne(1)).toEqual(processingMethod);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['yerbaMates'],
      });
    });

    it('should throw NotFoundException if processing method not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a processing method', async () => {
      const updateProcessingMethodDto: UpdateProcessingMethodDto = {
        name: 'Updated Processing Method',
      };
      const processingMethod = { id: 1, ...updateProcessingMethodDto };

      jest
        .spyOn(repository, 'update')
        .mockResolvedValue({ affected: 1 } as any);
      jest.spyOn(service, 'findOne').mockResolvedValue(processingMethod as any);

      expect(await service.update(1, updateProcessingMethodDto)).toEqual(
        processingMethod,
      );
      expect(repository.update).toHaveBeenCalledWith(
        1,
        updateProcessingMethodDto,
      );
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if processing method not found', async () => {
      const updateProcessingMethodDto: UpdateProcessingMethodDto = {
        name: 'Updated Processing Method',
      };

      jest
        .spyOn(repository, 'update')
        .mockResolvedValue({ affected: 0 } as any);

      await expect(
        service.update(1, updateProcessingMethodDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a processing method', async () => {
      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ affected: 1 } as any);

      await service.remove(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if processing method not found', async () => {
      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ affected: 0 } as any);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
