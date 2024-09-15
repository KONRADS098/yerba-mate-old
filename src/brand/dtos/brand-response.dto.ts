import { Expose, Transform } from 'class-transformer';

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
  @Transform(
    ({ obj }) => obj.yerbaMates?.map((yerbaMate) => yerbaMate.id) || [],
  )
  yerbaMateIds: number[];
}
