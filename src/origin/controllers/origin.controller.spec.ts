import { Test, TestingModule } from '@nestjs/testing';
import { OriginService } from '../services/origin.service';
import { OriginController } from './origin.controller';

describe('OriginController', () => {
  let controller: OriginController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: OriginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OriginController],
      providers: [
        {
          provide: OriginService,
          useValue: {
            // Mock implementation of OriginService methods
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({}),
            create: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            remove: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<OriginController>(OriginController);
    service = module.get<OriginService>(OriginService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
