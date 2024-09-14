import { Expose } from '@nestjs/class-transformer';
import { PartialType } from '@nestjs/swagger';
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

export class UpdateUserLongevityVoteDto extends PartialType(
  CreateUserLongevityVoteDto,
) {}

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
