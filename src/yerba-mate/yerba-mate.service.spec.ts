import { Test, TestingModule } from '@nestjs/testing';
import { YerbaMateService } from './yerba-mate.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { YerbaMate } from '../shared/entities/yerba-mate.entity';
import { ProcessingMethod } from '../shared/entities/processing-method.entity';
import { Repository } from 'typeorm';

describe('YerbaMateService', () => {
  let service: YerbaMateService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let yerbaMateRepository: Repository<YerbaMate>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let processingMethodRepository: Repository<ProcessingMethod>;

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
});
