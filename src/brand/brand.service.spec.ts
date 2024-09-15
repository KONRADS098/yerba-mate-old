import { Test, TestingModule } from '@nestjs/testing';
import { BrandService } from './brand.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Brand } from '../shared/entities/brand.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from './brand.dto';

describe('BrandService', () => {
  let service: BrandService;
  let repository: Repository<Brand>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrandService,
        {
          provide: getRepositoryToken(Brand),
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

    service = module.get<BrandService>(BrandService);
    repository = module.get<Repository<Brand>>(getRepositoryToken(Brand));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a brand', async () => {
      const createBrandDto: CreateBrandDto = {
        name: 'Test Brand',
        countryId: 1,
      };
      const brand = { id: 1, ...createBrandDto };

      jest.spyOn(repository, 'create').mockReturnValue(brand as any);
      jest.spyOn(repository, 'save').mockResolvedValue(brand as any);

      expect(await service.create(createBrandDto)).toEqual(brand);
      expect(repository.create).toHaveBeenCalledWith(createBrandDto);
      expect(repository.save).toHaveBeenCalledWith(brand);
    });
  });

  describe('findAll', () => {
    it('should return an array of brands', async () => {
      const brands = [{ id: 1, name: 'Test Brand' }];
      jest.spyOn(repository, 'find').mockResolvedValue(brands as any);

      expect(await service.findAll()).toEqual(brands);
      expect(repository.find).toHaveBeenCalledWith({
        relations: ['yerbaMates'],
      });
    });
  });

  describe('findOne', () => {
    it('should return a brand by ID', async () => {
      const brand = { id: 1, name: 'Test Brand' };
      jest.spyOn(repository, 'findOne').mockResolvedValue(brand as any);

      expect(await service.findOne(1)).toEqual(brand);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['yerbaMates'],
      });
    });

    it('should throw NotFoundException if brand not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a brand', async () => {
      const updateBrandDto: UpdateBrandDto = { name: 'Updated Brand' };
      const brand = { id: 1, ...updateBrandDto };

      jest
        .spyOn(repository, 'update')
        .mockResolvedValue({ affected: 1 } as any);
      jest.spyOn(service, 'findOne').mockResolvedValue(brand as any);

      expect(await service.update(1, updateBrandDto)).toEqual(brand);
      expect(repository.update).toHaveBeenCalledWith(1, updateBrandDto);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if brand not found', async () => {
      const updateBrandDto: UpdateBrandDto = { name: 'Updated Brand' };

      jest
        .spyOn(repository, 'update')
        .mockResolvedValue({ affected: 0 } as any);

      await expect(service.update(1, updateBrandDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a brand', async () => {
      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ affected: 1 } as any);

      await service.remove(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if brand not found', async () => {
      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ affected: 0 } as any);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
