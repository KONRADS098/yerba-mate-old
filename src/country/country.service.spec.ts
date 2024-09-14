import { Test, TestingModule } from '@nestjs/testing';
import { CountryService } from './country.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Country } from './country.entity';
import { Repository } from 'typeorm';

describe('CountryService', () => {
  let service: CountryService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repository: Repository<Country>;

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
        CountryService,
        {
          provide: getRepositoryToken(Country),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CountryService>(CountryService);
    repository = module.get<Repository<Country>>(getRepositoryToken(Country));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
