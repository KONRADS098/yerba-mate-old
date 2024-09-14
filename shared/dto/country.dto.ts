import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

export class CreateCountryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2)
  code: string;
}

export class UpdateCountryDto extends PartialType(CreateCountryDto) {}

export class CountryResponseDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  code: string;

  @Expose()
  @Transform(({ obj }) => obj.brands?.map((brand) => brand.id) || [])
  brandIds: number[];

  @Expose()
  @Transform(({ obj }) => obj.origins?.map((origin) => origin.id) || [])
  originIds: number[];
}
