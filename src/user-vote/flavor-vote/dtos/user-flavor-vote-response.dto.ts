import { Expose } from 'class-transformer';

export class UserFlavorVoteResponseDto {
  @Expose()
  id: number;

  @Expose()
  userId: number;

  @Expose()
  yerbaMateId: number;

  @Expose()
  flavorId: number;

  @Expose()
  score: number;
}
