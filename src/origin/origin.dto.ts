import { PartialType } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Expose, Transform } from 'class-transformer';

export class CreateOriginDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsPositive()
  countryId: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  region?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string;
}

export class UpdateOriginDto extends PartialType(CreateOriginDto) {}

export class OriginResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  countryId: number;

  @Expose()
  region: string;

  @Expose()
  description: string;

  @Expose()
  @Transform(
    ({ obj }) => obj.yerbaMates?.map((yerbaMate) => yerbaMate.id) || [],
  )
  yerbaMateIds: number[];
}
