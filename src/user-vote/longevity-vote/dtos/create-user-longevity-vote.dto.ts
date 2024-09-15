import { IsInt, IsPositive, Max, Min } from 'class-validator';

export class CreateUserLongevityVoteDto {
  @IsInt()
  @IsPositive()
  userId: number;

  @IsInt()
  @IsPositive()
  yerbaMateId: number;

  @IsInt()
  @Min(0)
  @Max(5)
  liters: number;
}
