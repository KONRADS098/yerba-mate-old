import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Flavor } from '../../shared/entities/flavor.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateFlavorDto } from '../dtos/create-flavor.dto';
import { UpdateFlavorDto } from '../dtos/update-flavor.dto';
import { FlavorService } from './flavor.service';

describe('FlavorService', () => {
  let service: FlavorService;
  let repository: Repository<Flavor>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FlavorService,
        {
          provide: getRepositoryToken(Flavor),
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

    service = module.get<FlavorService>(FlavorService);
    repository = module.get<Repository<Flavor>>(getRepositoryToken(Flavor));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a flavor', async () => {
      const createFlavorDto: CreateFlavorDto = { name: 'Test Flavor' };
      const flavor = { id: 1, ...createFlavorDto };

      jest.spyOn(repository, 'create').mockReturnValue(flavor as any);
      jest.spyOn(repository, 'save').mockResolvedValue(flavor as any);

      expect(await service.create(createFlavorDto)).toEqual(flavor);
      expect(repository.create).toHaveBeenCalledWith(createFlavorDto);
      expect(repository.save).toHaveBeenCalledWith(flavor);
    });
  });

  describe('findAll', () => {
    it('should return an array of flavors', async () => {
      const flavors = [{ id: 1, name: 'Test Flavor' }];
      jest.spyOn(repository, 'find').mockResolvedValue(flavors as any);

      expect(await service.findAll()).toEqual(flavors);
      expect(repository.find).toHaveBeenCalledWith({
        relations: ['userFlavorVotes'],
      });
    });
  });

  describe('findOne', () => {
    it('should return a flavor by ID', async () => {
      const flavor = { id: 1, name: 'Test Flavor' };
      jest.spyOn(repository, 'findOne').mockResolvedValue(flavor as any);

      expect(await service.findOne(1)).toEqual(flavor);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['userFlavorVotes'],
      });
    });

    it('should throw NotFoundException if flavor not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a flavor', async () => {
      const updateFlavorDto: UpdateFlavorDto = { name: 'Updated Flavor' };
      const flavor = { id: 1, ...updateFlavorDto };

      jest
        .spyOn(repository, 'update')
        .mockResolvedValue({ affected: 1 } as any);
      jest.spyOn(service, 'findOne').mockResolvedValue(flavor as any);

      expect(await service.update(1, updateFlavorDto)).toEqual(flavor);
      expect(repository.update).toHaveBeenCalledWith(1, updateFlavorDto);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if flavor not found', async () => {
      const updateFlavorDto: UpdateFlavorDto = { name: 'Updated Flavor' };

      jest
        .spyOn(repository, 'update')
        .mockResolvedValue({ affected: 0 } as any);

      await expect(service.update(1, updateFlavorDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a flavor', async () => {
      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ affected: 1 } as any);

      await service.remove(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if flavor not found', async () => {
      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ affected: 0 } as any);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
