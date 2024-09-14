import { Exclude, Expose, Transform } from '@nestjs/class-transformer';
import { PartialType } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';
import { UserRole } from '../../src/user/user.entity';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

@Exclude()
export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  role: UserRole;

  @Expose()
  @Transform(({ obj }) => obj.flavorVotes.map((vote) => vote.id))
  flavorVoteIds: number[];

  @Expose()
  @Transform(({ obj }) => obj.temperatureVotes.map((vote) => vote.id))
  temperatureVoteIds: number[];

  @Expose()
  @Transform(({ obj }) => obj.longevityVotes.map((vote) => vote.id))
  longevityVoteIds: number[];
}
