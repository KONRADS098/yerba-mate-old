import { Module } from '@nestjs/common';
import { FlavorService } from './flavor.service';
import { FlavorController } from './flavor.controller';

@Module({
  providers: [FlavorService],
  controllers: [FlavorController],
})
export class FlavorModule {}
