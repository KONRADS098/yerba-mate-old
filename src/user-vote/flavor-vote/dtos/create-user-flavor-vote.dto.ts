import { IsInt, IsPositive, Max, Min } from 'class-validator';

export class CreateUserFlavorVoteDto {
  @IsInt()
  @IsPositive()
  userId: number;

  @IsInt()
  @IsPositive()
  yerbaMateId: number;

  @IsInt()
  @IsPositive()
  flavorId: number;

  @IsInt()
  @Min(1)
  @Max(5)
  score: number;
}
