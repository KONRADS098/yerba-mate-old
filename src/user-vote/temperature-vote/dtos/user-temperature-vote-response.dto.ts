import { Expose } from 'class-transformer';

export class UserTemperatureVoteResponseDto {
  @Expose()
  id: number;

  @Expose()
  userId: number;

  @Expose()
  yerbaMateId: number;

  @Expose()
  temperature: number;
}
