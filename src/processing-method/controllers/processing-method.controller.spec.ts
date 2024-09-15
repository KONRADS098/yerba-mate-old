import { Test, TestingModule } from '@nestjs/testing';
import { ProcessingMethodService } from '../services/processing-method.service';
import { ProcessingMethodController } from './processing-method.controller';

describe('ProcessingMethodController', () => {
  let controller: ProcessingMethodController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: ProcessingMethodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcessingMethodController],
      providers: [
        {
          provide: ProcessingMethodService,
          useValue: {
            // Mock implementation of ProcessingMethodService methods
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({}),
            create: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            remove: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<ProcessingMethodController>(
      ProcessingMethodController,
    );
    service = module.get<ProcessingMethodService>(ProcessingMethodService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
