import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Exclude, Expose, Transform } from '@nestjs/class-transformer';

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

@Exclude()
export class ProcessingMethodResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description?: string;

  @Expose()
  @Transform(({ obj }) => obj.yerbaMates.map((yerbaMate) => yerbaMate.id))
  yerbaMateIds: number[];
}
