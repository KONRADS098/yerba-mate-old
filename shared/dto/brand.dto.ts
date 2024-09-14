import { Exclude, Expose, Transform } from '@nestjs/class-transformer';
import { PartialType } from '@nestjs/mapped-types';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsPositive()
  countryId: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  website?: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}

@Exclude()
export class BrandResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  countryId: number;

  @Expose()
  description: string;

  @Expose()
  website: string;

  @Expose()
  @Transform(({ obj }) => obj.yerbaMates.map((yerbaMate) => yerbaMate.id))
  yerbaMateIds: number[];
}
