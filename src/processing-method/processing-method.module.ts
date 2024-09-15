import { Module } from '@nestjs/common';
import { ProcessingMethodService } from './services/processing-method.service';
import { ProcessingMethodController } from './controllers/processing-method.controller';
import { YerbaMate } from '../shared/entities/yerba-mate.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcessingMethod } from '../shared/entities/processing-method.entity';

@Module({
  imports: [TypeOrmModule.forFeature([YerbaMate, ProcessingMethod])],
  providers: [ProcessingMethodService],
  controllers: [ProcessingMethodController],
})
export class ProcessingMethodModule {}
