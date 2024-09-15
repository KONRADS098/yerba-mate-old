import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCountryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2)
  code: string;
}
