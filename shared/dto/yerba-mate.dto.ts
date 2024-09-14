import { PartialType } from '@nestjs/swagger';
import { Expose, Transform } from '@nestjs/class-transformer';
import {
  IsInt,
  IsPositive,
  IsString,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
  IsNotEmpty,
} from 'class-validator';

export class CreateYerbaMateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsPositive()
  brandId: number;

  @IsInt()
  @IsPositive()
  originId: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  processingMethodIds: number[];

  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateYerbaMateDto extends PartialType(CreateYerbaMateDto) {}

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
  @Transform(({ obj }) => obj.processingMethods.map((method) => method.id))
  processingMethodIds: number[];

  @Expose()
  description?: string;

  @Expose()
  @Transform(({ obj }) => obj.userFlavorVotes.map((vote) => vote.id))
  userFlavorVoteIds: number[];

  @Expose()
  @Transform(({ obj }) => obj.userTemperatureVotes.map((vote) => vote.id))
  userTemperatureVoteIds: number[];

  @Expose()
  @Transform(({ obj }) => obj.userLongevityVotes.map((vote) => vote.id))
  userLongevityVoteIds: number[];
}
