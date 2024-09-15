import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateOriginDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsPositive()
  countryId: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  region?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string;
}
