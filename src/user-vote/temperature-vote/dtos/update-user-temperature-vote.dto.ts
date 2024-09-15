import { PartialType } from '@nestjs/swagger';
import { CreateUserTemperatureVoteDto } from './create-user-temperature-vote.dto';

export class UpdateUserTemperatureVoteDto extends PartialType(
  CreateUserTemperatureVoteDto,
) {}
