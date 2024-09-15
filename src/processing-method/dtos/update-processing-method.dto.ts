import { PartialType } from '@nestjs/swagger';
import { CreateProcessingMethodDto } from './create-processing-method.dto';

export class UpdateProcessingMethodDto extends PartialType(
  CreateProcessingMethodDto,
) {}
