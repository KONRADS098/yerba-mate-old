import { Module } from '@nestjs/common';
import { ProcessingMethodService } from './processing-method.service';
import { ProcessingMethodController } from './processing-method.controller';

@Module({
  providers: [ProcessingMethodService],
  controllers: [ProcessingMethodController],
})
export class ProcessingMethodModule {}
