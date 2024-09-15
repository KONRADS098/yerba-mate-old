import { Expose, Transform } from 'class-transformer';

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
