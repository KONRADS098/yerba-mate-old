import { Test, TestingModule } from '@nestjs/testing';
import { OriginService } from './origin.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Origin } from '../shared/entities/origin.entity';
import { Repository } from 'typeorm';

describe('OriginService', () => {
  let service: OriginService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repository: Repository<Origin>;

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
        OriginService,
        {
          provide: getRepositoryToken(Origin),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<OriginService>(OriginService);
    repository = module.get<Repository<Origin>>(getRepositoryToken(Origin));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
