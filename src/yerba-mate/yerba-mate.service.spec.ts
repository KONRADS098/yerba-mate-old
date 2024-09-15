import { Test, TestingModule } from '@nestjs/testing';
import { YerbaMateService } from './yerba-mate.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { YerbaMate } from '../shared/entities/yerba-mate.entity';
import { ProcessingMethod } from '../shared/entities/processing-method.entity';
import { In, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateYerbaMateDto, UpdateYerbaMateDto } from './yerba-mate.dto';

describe('YerbaMateService', () => {
  let service: YerbaMateService;
  let yerbaMateRepository: Repository<YerbaMate>;
  let processingMethodRepository: Repository<ProcessingMethod>;

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      findBy: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        YerbaMateService,
        {
          provide: getRepositoryToken(YerbaMate),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(ProcessingMethod),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<YerbaMateService>(YerbaMateService);
    yerbaMateRepository = module.get<Repository<YerbaMate>>(
      getRepositoryToken(YerbaMate),
    );
    processingMethodRepository = module.get<Repository<ProcessingMethod>>(
      getRepositoryToken(ProcessingMethod),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a yerba mate', async () => {
      const createDto: CreateYerbaMateDto = {
        name: 'Test Yerba Mate',
        brandId: 1,
        originId: 1,
        processingMethodIds: [1, 2],
      };
      const processingMethods = [{ id: 1 }, { id: 2 }];
      const yerbaMate = { id: 1, ...createDto, processingMethods };

      jest
        .spyOn(processingMethodRepository, 'findBy')
        .mockResolvedValue(processingMethods as any);
      jest
        .spyOn(yerbaMateRepository, 'create')
        .mockReturnValue(yerbaMate as any);
      jest
        .spyOn(yerbaMateRepository, 'save')
        .mockResolvedValue(yerbaMate as any);

      expect(await service.create(createDto)).toEqual(yerbaMate);
      expect(processingMethodRepository.findBy).toHaveBeenCalledWith({
        id: In(createDto.processingMethodIds),
      });
      expect(yerbaMateRepository.create).toHaveBeenCalledWith({
        name: 'Test Yerba Mate',
        brandId: 1,
        originId: 1,
        processingMethods,
      });
      expect(yerbaMateRepository.save).toHaveBeenCalledWith(yerbaMate);
    });
  });

  describe('findAll', () => {
    it('should return an array of yerba mates', async () => {
      const yerbaMates = [{ id: 1, name: 'Test Yerba Mate' }];
      jest
        .spyOn(yerbaMateRepository, 'find')
        .mockResolvedValue(yerbaMates as any);

      expect(await service.findAll()).toEqual(yerbaMates);
      expect(yerbaMateRepository.find).toHaveBeenCalledWith({
        relations: [
          'brand',
          'origin',
          'processingMethods',
          'userFlavorVotes',
          'userTemperatureVotes',
          'userLongevityVotes',
        ],
      });
    });
  });

  describe('findOne', () => {
    it('should return a yerba mate by ID', async () => {
      const yerbaMate = { id: 1, name: 'Test Yerba Mate' };
      jest
        .spyOn(yerbaMateRepository, 'findOne')
        .mockResolvedValue(yerbaMate as any);

      expect(await service.findOne(1)).toEqual(yerbaMate);
      expect(yerbaMateRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: [
          'brand',
          'origin',
          'processingMethods',
          'userFlavorVotes',
          'userTemperatureVotes',
          'userLongevityVotes',
        ],
      });
    });

    it('should throw NotFoundException if yerba mate not found', async () => {
      jest.spyOn(yerbaMateRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    describe('update', () => {
      it('should update a yerba mate', async () => {
        const updateDto: UpdateYerbaMateDto = {
          name: 'Updated Yerba Mate',
          processingMethodIds: [1, 2],
        };
        const processingMethods = [{ id: 1 }, { id: 2 }];
        const yerbaMate = { id: 1, ...updateDto, processingMethods };

        jest
          .spyOn(processingMethodRepository, 'findBy')
          .mockResolvedValue(processingMethods as any);
        jest
          .spyOn(yerbaMateRepository, 'update')
          .mockResolvedValue({ affected: 1 } as any);
        jest.spyOn(service, 'findOne').mockResolvedValue(yerbaMate as any);

        expect(await service.update(1, updateDto)).toEqual(yerbaMate);
        expect(processingMethodRepository.findBy).toHaveBeenCalledWith({
          id: In(updateDto.processingMethodIds),
        });
        expect(yerbaMateRepository.update).toHaveBeenCalledWith(1, {
          name: 'Updated Yerba Mate',
          processingMethods,
        });
        expect(service.findOne).toHaveBeenCalledWith(1);
      });

      it('should throw NotFoundException if yerba mate not found', async () => {
        const updateDto: UpdateYerbaMateDto = {
          name: 'Updated Yerba Mate',
          processingMethodIds: [1, 2],
        };

        jest
          .spyOn(yerbaMateRepository, 'update')
          .mockResolvedValue({ affected: 0 } as any);

        await expect(service.update(1, updateDto)).rejects.toThrow(
          NotFoundException,
        );
      });
    });

    it('should throw NotFoundException if yerba mate not found', async () => {
      const updateDto: UpdateYerbaMateDto = {
        name: 'Updated Yerba Mate',
        processingMethodIds: [1, 2],
      };

      jest
        .spyOn(yerbaMateRepository, 'update')
        .mockResolvedValue({ affected: 0 } as any);

      await expect(service.update(1, updateDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a yerba mate', async () => {
      jest
        .spyOn(yerbaMateRepository, 'delete')
        .mockResolvedValue({ affected: 1 } as any);

      await service.remove(1);
      expect(yerbaMateRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if yerba mate not found', async () => {
      jest
        .spyOn(yerbaMateRepository, 'delete')
        .mockResolvedValue({ affected: 0 } as any);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
