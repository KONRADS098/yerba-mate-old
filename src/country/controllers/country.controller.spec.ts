import { Test, TestingModule } from '@nestjs/testing';
import { CountryService } from '../services/country.service';
import { CountryController } from './country.controller';

describe('CountryController', () => {
  let controller: CountryController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: CountryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountryController],
      providers: [
        {
          provide: CountryService,
          useValue: {
            // Mock implementation of CountryService methods
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({}),
            create: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            remove: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<CountryController>(CountryController);
    service = module.get<CountryService>(CountryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
