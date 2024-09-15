import { Expose, Transform } from 'class-transformer';

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
