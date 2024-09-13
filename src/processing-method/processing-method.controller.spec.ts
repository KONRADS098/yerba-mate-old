import { Test, TestingModule } from '@nestjs/testing';
import { ProcessingMethodController } from './processing-method.controller';

describe('ProcessingMethodController', () => {
  let controller: ProcessingMethodController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcessingMethodController],
    }).compile();

    controller = module.get<ProcessingMethodController>(ProcessingMethodController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
