import { Module } from '@nestjs/common';
import { ProcessingMethodService } from './processing-method.service';
import { ProcessingMethodController } from './processing-method.controller';
import { YerbaMate } from '../yerba-mate/yerba-mate.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcessingMethod } from './processing-method.entity';

@Module({
  imports: [TypeOrmModule.forFeature([YerbaMate, ProcessingMethod])],
  providers: [ProcessingMethodService],
  controllers: [ProcessingMethodController],
})
export class ProcessingMethodModule {}
