import { Expose, Transform } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  @Transform(({ obj }) => obj.flavorVotes?.map((vote) => vote.id) || [])
  flavorVoteIds: number[];

  @Expose()
  @Transform(({ obj }) => obj.temperatureVotes?.map((vote) => vote.id) || [])
  temperatureVoteIds: number[];

  @Expose()
  @Transform(({ obj }) => obj.longevityVotes?.map((vote) => vote.id) || [])
  longevityVoteIds: number[];
}
