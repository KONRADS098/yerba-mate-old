import { PartialType } from '@nestjs/mapped-types';
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

export class UpdateUserFlavorVoteDto extends PartialType(
  CreateUserFlavorVoteDto,
) {}

export class CreateUserLongevityVoteDto {
  @IsInt()
  @IsPositive()
  userId: number;

  @IsInt()
  @IsPositive()
  yerbaMateId: number;

  @IsInt()
  @Min(1)
  @Max(5)
  liters: number;
}

export class UpdateUserLongevityVoteDto extends PartialType(
  CreateUserLongevityVoteDto,
) {}

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

export class UpdateUserTemperatureVoteDto extends PartialType(
  CreateUserTemperatureVoteDto,
) {}
