import { Test, TestingModule } from '@nestjs/testing';
import { ProcessingMethodService } from './processing-method.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProcessingMethod } from './processing-method.entity';
import { Repository } from 'typeorm';

describe('ProcessingMethodService', () => {
  let service: ProcessingMethodService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repository: Repository<ProcessingMethod>;

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
        ProcessingMethodService,
        {
          provide: getRepositoryToken(ProcessingMethod),
          useValue: mockRepository,
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
});
