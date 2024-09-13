import { Test, TestingModule } from '@nestjs/testing';
import { YerbaMateController } from './yerba-mate.controller';

describe('YerbaMateController', () => {
  let controller: YerbaMateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [YerbaMateController],
    }).compile();

    controller = module.get<YerbaMateController>(YerbaMateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
