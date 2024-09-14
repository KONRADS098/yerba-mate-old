import { Test, TestingModule } from '@nestjs/testing';
import { FlavorController } from './flavor.controller';
import { FlavorService } from './flavor.service';

describe('FlavorController', () => {
  let controller: FlavorController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: FlavorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlavorController],
      providers: [
        {
          provide: FlavorService,
          useValue: {
            // Mock implementation of FlavorService methods
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({}),
            create: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            remove: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<FlavorController>(FlavorController);
    service = module.get<FlavorService>(FlavorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
