import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserTemperatureVoteService } from '../services/user-temperature-vote.service';
import { UserTemperatureVoteResponseDto } from '../dtos/user-temperature-vote-response.dto';
import { UpdateUserTemperatureVoteDto } from '../dtos/update-user-temperature-vote.dto';
import { CreateUserTemperatureVoteDto } from '../dtos/create-user-temperature-vote.dto';

@ApiTags('user-vote')
@Controller('user-temperature-vote')
export class UserTemperatureVoteController {
  constructor(
    private readonly userTemperatureVoteService: UserTemperatureVoteService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new temperature vote' })
  @ApiResponse({
    status: 201,
    description: 'The temperature vote has been successfully created.',
    type: UserTemperatureVoteResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createTemperatureVote(
    @Body() createDto: CreateUserTemperatureVoteDto,
  ): Promise<UserTemperatureVoteResponseDto> {
    const vote =
      await this.userTemperatureVoteService.createTemperatureVote(createDto);
    return plainToInstance(UserTemperatureVoteResponseDto, vote);
  }

  @Get()
  @ApiOperation({ summary: 'Get all temperature votes' })
  @ApiResponse({
    status: 200,
    description: 'Return all temperature votes.',
    type: [UserTemperatureVoteResponseDto],
  })
  async findAllTemperatureVotes(): Promise<UserTemperatureVoteResponseDto[]> {
    const votes =
      await this.userTemperatureVoteService.findAllTemperatureVotes();
    return votes.map((vote) =>
      plainToInstance(UserTemperatureVoteResponseDto, vote),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a temperature vote by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the temperature vote with the given ID.',
    type: UserTemperatureVoteResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Temperature vote not found.' })
  async findOneTemperatureVote(
    @Param('id') id: number,
  ): Promise<UserTemperatureVoteResponseDto> {
    const vote =
      await this.userTemperatureVoteService.findOneTemperatureVote(id);
    return plainToInstance(UserTemperatureVoteResponseDto, vote);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a temperature vote by ID' })
  @ApiResponse({
    status: 200,
    description: 'The temperature vote has been successfully updated.',
    type: UserTemperatureVoteResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Temperature vote not found.' })
  async updateTemperatureVote(
    @Param('id') id: number,
    @Body() updateDto: UpdateUserTemperatureVoteDto,
  ): Promise<UserTemperatureVoteResponseDto> {
    const vote = await this.userTemperatureVoteService.updateTemperatureVote(
      id,
      updateDto,
    );
    return plainToInstance(UserTemperatureVoteResponseDto, vote);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a temperature vote by ID' })
  @ApiResponse({
    status: 200,
    description: 'The temperature vote has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Temperature vote not found.' })
  async removeTemperatureVote(@Param('id') id: number): Promise<void> {
    return this.userTemperatureVoteService.removeTemperatureVote(id);
  }
}
