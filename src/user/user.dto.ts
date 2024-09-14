import { Expose, Transform } from 'class-transformer';
import { PartialType } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Matches(/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, {
    message:
      'username must be 8-20 characters long, no _ or . at the beginning, no __ or _. or ._ or .. inside, allowed characters = numbers and letters, no _ or . at the end',
  })
  username: string;

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

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  @Transform(({ obj }) => obj.flavorVotes?.map((vote) => vote.id) || [])
  flavorVoteIds: number[];

  @Expose()
  @Transform(({ obj }) => obj.temperatureVotes?.map((vote) => vote.id) || [])
  temperatureVoteIds: number[];

  @Expose()
  @Transform(({ obj }) => obj.longevityVotes?.map((vote) => vote.id) || [])
  longevityVoteIds: number[];
}
