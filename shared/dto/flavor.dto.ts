import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFlavorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string;
}

export class UpdateFlavorDto extends PartialType(CreateFlavorDto) {}
