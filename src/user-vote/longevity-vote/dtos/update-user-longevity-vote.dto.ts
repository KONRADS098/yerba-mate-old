import { PartialType } from '@nestjs/swagger';
import { CreateUserLongevityVoteDto } from './create-user-longevity-vote.dto';

export class UpdateUserLongevityVoteDto extends PartialType(
  CreateUserLongevityVoteDto,
) {}
