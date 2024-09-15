import { IsInt, IsPositive, Max, Min } from 'class-validator';

export class CreateUserTemperatureVoteDto {
  @IsInt()
  @IsPositive()
  userId: number;

  @IsInt()
  @IsPositive()
  yerbaMateId: number;

  @IsInt()
  @Min(1)
  @Max(100)
  temperature: number;
}
