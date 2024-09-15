import { Expose } from 'class-transformer';

export class UserLongevityVoteResponseDto {
  @Expose()
  id: number;

  @Expose()
  userId: number;

  @Expose()
  yerbaMateId: number;

  @Expose()
  liters: number;
}
