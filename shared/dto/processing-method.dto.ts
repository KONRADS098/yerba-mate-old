import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

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

export class ProcessingMethodResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description?: string;

  @Expose()
  @Transform(
    ({ obj }) => obj.yerbaMates?.map((yerbaMate) => yerbaMate.id) || [],
  )
  yerbaMateIds?: number[];
}
