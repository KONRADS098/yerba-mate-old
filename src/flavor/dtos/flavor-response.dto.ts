import { Expose } from 'class-transformer';

export class FlavorResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;
}
