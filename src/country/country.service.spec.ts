import { Test, TestingModule } from '@nestjs/testing';
import { CountryService } from './country.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Country } from '../shared/entities/country.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateCountryDto, UpdateCountryDto } from './country.dto';

describe('CountryService', () => {
  let service: CountryService;
  let repository: Repository<Country>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountryService,
        {
          provide: getRepositoryToken(Country),
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

    service = module.get<CountryService>(CountryService);
    repository = module.get<Repository<Country>>(getRepositoryToken(Country));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a country', async () => {
      const createCountryDto: CreateCountryDto = {
        name: 'Test Country',
        code: 'TC',
      };
      const country = { id: 1, ...createCountryDto };

      jest.spyOn(repository, 'create').mockReturnValue(country as any);
      jest.spyOn(repository, 'save').mockResolvedValue(country as any);

      expect(await service.create(createCountryDto)).toEqual(country);
      expect(repository.create).toHaveBeenCalledWith(createCountryDto);
      expect(repository.save).toHaveBeenCalledWith(country);
    });
  });

  describe('findAll', () => {
    it('should return an array of countries', async () => {
      const countries = [{ id: 1, name: 'Test Country' }];
      jest.spyOn(repository, 'find').mockResolvedValue(countries as any);

      expect(await service.findAll()).toEqual(countries);
      expect(repository.find).toHaveBeenCalledWith({
        relations: ['brands', 'origins'],
      });
    });
  });

  describe('findOne', () => {
    it('should return a country by ID', async () => {
      const country = { id: 1, name: 'Test Country' };
      jest.spyOn(repository, 'findOne').mockResolvedValue(country as any);

      expect(await service.findOne(1)).toEqual(country);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['brands', 'origins'],
      });
    });

    it('should throw NotFoundException if country not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a country', async () => {
      const updateCountryDto: UpdateCountryDto = { name: 'Updated Country' };
      const country = { id: 1, ...updateCountryDto };

      jest
        .spyOn(repository, 'update')
        .mockResolvedValue({ affected: 1 } as any);
      jest.spyOn(service, 'findOne').mockResolvedValue(country as any);

      expect(await service.update(1, updateCountryDto)).toEqual(country);
      expect(repository.update).toHaveBeenCalledWith(1, updateCountryDto);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if country not found', async () => {
      const updateCountryDto: UpdateCountryDto = { name: 'Updated Country' };

      jest
        .spyOn(repository, 'update')
        .mockResolvedValue({ affected: 0 } as any);

      await expect(service.update(1, updateCountryDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a country', async () => {
      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ affected: 1 } as any);

      await service.remove(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if country not found', async () => {
      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ affected: 0 } as any);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
