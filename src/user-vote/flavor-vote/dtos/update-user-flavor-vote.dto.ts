import { PartialType } from '@nestjs/swagger';
import { CreateUserFlavorVoteDto } from './create-user-flavor-vote.dto';

export class UpdateUserFlavorVoteDto extends PartialType(
  CreateUserFlavorVoteDto,
) {}
