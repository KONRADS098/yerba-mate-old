import { Test, TestingModule } from '@nestjs/testing';
import { ProcessingMethodService } from './processing-method.service';

describe('ProcessingMethodService', () => {
  let service: ProcessingMethodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProcessingMethodService],
    }).compile();

    service = module.get<ProcessingMethodService>(ProcessingMethodService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
