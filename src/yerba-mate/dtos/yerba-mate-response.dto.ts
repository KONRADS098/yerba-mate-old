import { Expose, Transform } from 'class-transformer';

export class YerbaMateResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  brandId: number;

  @Expose()
  originId: number;

  @Expose()
  @Transform(
    ({ obj }) => obj.processingMethods?.map((method) => method.id) || [],
  )
  processingMethodIds: number[];

  @Expose()
  description?: string;

  @Expose()
  @Transform(({ obj }) => obj.userFlavorVotes?.map((vote) => vote.id) || [])
  userFlavorVoteIds: number[];

  @Expose()
  @Transform(
    ({ obj }) => obj.userTemperatureVotes?.map((vote) => vote.id) || [],
  )
  userTemperatureVoteIds: number[];

  @Expose()
  @Transform(({ obj }) => obj.userLongevityVotes?.map((vote) => vote.id) || [])
  userLongevityVoteIds: number[];
}
