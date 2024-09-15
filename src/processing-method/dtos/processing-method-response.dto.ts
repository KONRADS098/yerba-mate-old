import { Expose, Transform } from 'class-transformer';

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
