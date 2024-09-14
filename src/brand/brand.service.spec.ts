import { Test, TestingModule } from '@nestjs/testing';
import { BrandService } from './brand.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Brand } from './brand.entity';
import { Repository } from 'typeorm';

describe('BrandService', () => {
  let service: BrandService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repository: Repository<Brand>;

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
        BrandService,
        {
          provide: getRepositoryToken(Brand),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<BrandService>(BrandService);
    repository = module.get<Repository<Brand>>(getRepositoryToken(Brand));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
