import { Module } from '@nestjs/common';
import { YerbaMateController } from './yerba-mate.controller';
import { YerbaMateService } from './yerba-mate.service';

@Module({
  controllers: [YerbaMateController],
  providers: [YerbaMateService],
})
export class YerbaMateModule {}
