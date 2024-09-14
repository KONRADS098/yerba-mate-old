import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserVoteService } from './user-vote.service';

import { plainToClass } from 'class-transformer';
import {
  CreateUserFlavorVoteDto,
  UserFlavorVoteResponseDto,
  UpdateUserFlavorVoteDto,
  CreateUserLongevityVoteDto,
  UserLongevityVoteResponseDto,
  UpdateUserLongevityVoteDto,
  CreateUserTemperatureVoteDto,
  UserTemperatureVoteResponseDto,
  UpdateUserTemperatureVoteDto,
} from '@shared/dto/user-vote.dto';

@Controller('user-vote')
export class UserVoteController {
  constructor(private readonly userVoteService: UserVoteService) {}

  // Flavor Vote Endpoints
  @Post('flavor')
  async createFlavorVote(
    @Body() createDto: CreateUserFlavorVoteDto,
  ): Promise<UserFlavorVoteResponseDto> {
    const vote = await this.userVoteService.createFlavorVote(createDto);
    return plainToClass(UserFlavorVoteResponseDto, vote);
  }

  @Get('flavor')
  async findAllFlavorVotes(): Promise<UserFlavorVoteResponseDto[]> {
    const votes = await this.userVoteService.findAllFlavorVotes();
    return votes.map((vote) => plainToClass(UserFlavorVoteResponseDto, vote));
  }

  @Get('flavor/:id')
  async findOneFlavorVote(
    @Param('id') id: number,
  ): Promise<UserFlavorVoteResponseDto> {
    const vote = await this.userVoteService.findOneFlavorVote(id);
    return plainToClass(UserFlavorVoteResponseDto, vote);
  }

  @Put('flavor/:id')
  async updateFlavorVote(
    @Param('id') id: number,
    @Body() updateDto: UpdateUserFlavorVoteDto,
  ): Promise<UserFlavorVoteResponseDto> {
    const vote = await this.userVoteService.updateFlavorVote(id, updateDto);
    return plainToClass(UserFlavorVoteResponseDto, vote);
  }

  @Delete('flavor/:id')
  async removeFlavorVote(@Param('id') id: number): Promise<void> {
    return this.userVoteService.removeFlavorVote(id);
  }

  // Longevity Vote Endpoints
  @Post('longevity')
  async createLongevityVote(
    @Body() createDto: CreateUserLongevityVoteDto,
  ): Promise<UserLongevityVoteResponseDto> {
    const vote = await this.userVoteService.createLongevityVote(createDto);
    return plainToClass(UserLongevityVoteResponseDto, vote);
  }

  @Get('longevity')
  async findAllLongevityVotes(): Promise<UserLongevityVoteResponseDto[]> {
    const votes = await this.userVoteService.findAllLongevityVotes();
    return votes.map((vote) =>
      plainToClass(UserLongevityVoteResponseDto, vote),
    );
  }

  @Get('longevity/:id')
  async findOneLongevityVote(
    @Param('id') id: number,
  ): Promise<UserLongevityVoteResponseDto> {
    const vote = await this.userVoteService.findOneLongevityVote(id);
    return plainToClass(UserLongevityVoteResponseDto, vote);
  }

  @Put('longevity/:id')
  async updateLongevityVote(
    @Param('id') id: number,
    @Body() updateDto: UpdateUserLongevityVoteDto,
  ): Promise<UserLongevityVoteResponseDto> {
    const vote = await this.userVoteService.updateLongevityVote(id, updateDto);
    return plainToClass(UserLongevityVoteResponseDto, vote);
  }

  @Delete('longevity/:id')
  async removeLongevityVote(@Param('id') id: number): Promise<void> {
    return this.userVoteService.removeLongevityVote(id);
  }

  // Temperature Vote Endpoints
  @Post('temperature')
  async createTemperatureVote(
    @Body() createDto: CreateUserTemperatureVoteDto,
  ): Promise<UserTemperatureVoteResponseDto> {
    const vote = await this.userVoteService.createTemperatureVote(createDto);
    return plainToClass(UserTemperatureVoteResponseDto, vote);
  }

  @Get('temperature')
  async findAllTemperatureVotes(): Promise<UserTemperatureVoteResponseDto[]> {
    const votes = await this.userVoteService.findAllTemperatureVotes();
    return votes.map((vote) =>
      plainToClass(UserTemperatureVoteResponseDto, vote),
    );
  }

  @Get('temperature/:id')
  async findOneTemperatureVote(
    @Param('id') id: number,
  ): Promise<UserTemperatureVoteResponseDto> {
    const vote = await this.userVoteService.findOneTemperatureVote(id);
    return plainToClass(UserTemperatureVoteResponseDto, vote);
  }

  @Put('temperature/:id')
  async updateTemperatureVote(
    @Param('id') id: number,
    @Body() updateDto: UpdateUserTemperatureVoteDto,
  ): Promise<UserTemperatureVoteResponseDto> {
    const vote = await this.userVoteService.updateTemperatureVote(
      id,
      updateDto,
    );
    return plainToClass(UserTemperatureVoteResponseDto, vote);
  }

  @Delete('temperature/:id')
  async removeTemperatureVote(@Param('id') id: number): Promise<void> {
    return this.userVoteService.removeTemperatureVote(id);
  }
}
