import { Test, TestingModule } from '@nestjs/testing';
import { YerbaMateController } from './yerba-mate.controller';
import { YerbaMateService } from './yerba-mate.service';

describe('YerbaMateController', () => {
  let controller: YerbaMateController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: YerbaMateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [YerbaMateController],
      providers: [
        {
          provide: YerbaMateService,
          useValue: {
            // Mock implementation of YerbaMateService methods
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({}),
            create: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            remove: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<YerbaMateController>(YerbaMateController);
    service = module.get<YerbaMateService>(YerbaMateService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
