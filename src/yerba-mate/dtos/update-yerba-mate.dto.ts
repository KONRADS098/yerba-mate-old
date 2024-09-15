import { PartialType } from '@nestjs/swagger';
import { CreateYerbaMateDto } from './create-yerba-mate.dto';

export class UpdateYerbaMateDto extends PartialType(CreateYerbaMateDto) {}
