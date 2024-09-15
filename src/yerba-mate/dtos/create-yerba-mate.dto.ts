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
