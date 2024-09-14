import { PartialType } from '@nestjs/swagger';

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

import { Exclude, Expose } from '@nestjs/class-transformer';

@Exclude()
export class FlavorResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;
}
