import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProcessingMethodDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string;
}

export class UpdateProcessingMethodDto extends PartialType(
  CreateProcessingMethodDto,
) {}
