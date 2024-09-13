import { Test, TestingModule } from '@nestjs/testing';
import { YerbaMateService } from './yerba-mate.service';

describe('YerbaMateService', () => {
  let service: YerbaMateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YerbaMateService],
    }).compile();

    service = module.get<YerbaMateService>(YerbaMateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
