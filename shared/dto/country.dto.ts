import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Exclude, Expose, Transform } from '@nestjs/class-transformer';

export class CreateCountryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}

export class UpdateCountryDto extends PartialType(CreateCountryDto) {}

@Exclude()
export class CountryResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  code: string;

  @Expose()
  @Transform(({ obj }) => obj.brands.map((brand) => brand.id))
  brandIds: number[];

  @Expose()
  @Transform(({ obj }) => obj.origins.map((origin) => origin.id))
  originIds: number[];
}
