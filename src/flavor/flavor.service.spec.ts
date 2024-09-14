import { Test, TestingModule } from '@nestjs/testing';
import { FlavorService } from './flavor.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Flavor } from './flavor.entity';
import { Repository } from 'typeorm';

describe('FlavorService', () => {
  let service: FlavorService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repository: Repository<Flavor>;

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
        FlavorService,
        {
          provide: getRepositoryToken(Flavor),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<FlavorService>(FlavorService);
    repository = module.get<Repository<Flavor>>(getRepositoryToken(Flavor));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
