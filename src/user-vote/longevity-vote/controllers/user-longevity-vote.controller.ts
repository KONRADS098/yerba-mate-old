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
import { UserLongevityVoteService } from '../services/user-longevity-vote.service';
import { UserLongevityVoteResponseDto } from '../dtos/user-longevity-vote-response.dto';
import { UpdateUserLongevityVoteDto } from '../dtos/update-user-longevity-vote.dto';
import { CreateUserLongevityVoteDto } from '../dtos/create-user-longevity-vote.dto';

@ApiTags('user-vote')
@Controller('user-longevity-vote')
export class UserLongevityVoteController {
  constructor(
    private readonly userLongevityVoteService: UserLongevityVoteService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new longevity vote' })
  @ApiResponse({
    status: 201,
    description: 'The longevity vote has been successfully created.',
    type: UserLongevityVoteResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createLongevityVote(
    @Body() createDto: CreateUserLongevityVoteDto,
  ): Promise<UserLongevityVoteResponseDto> {
    const vote =
      await this.userLongevityVoteService.createLongevityVote(createDto);
    return plainToInstance(UserLongevityVoteResponseDto, vote);
  }

  @Get()
  @ApiOperation({ summary: 'Get all longevity votes' })
  @ApiResponse({
    status: 200,
    description: 'Return all longevity votes.',
    type: [UserLongevityVoteResponseDto],
  })
  async findAllLongevityVotes(): Promise<UserLongevityVoteResponseDto[]> {
    const votes = await this.userLongevityVoteService.findAllLongevityVotes();
    return votes.map((vote) =>
      plainToInstance(UserLongevityVoteResponseDto, vote),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a longevity vote by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the longevity vote with the given ID.',
    type: UserLongevityVoteResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Longevity vote not found.' })
  async findOneLongevityVote(
    @Param('id') id: number,
  ): Promise<UserLongevityVoteResponseDto> {
    const vote = await this.userLongevityVoteService.findOneLongevityVote(id);
    return plainToInstance(UserLongevityVoteResponseDto, vote);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a longevity vote by ID' })
  @ApiResponse({
    status: 200,
    description: 'The longevity vote has been successfully updated.',
    type: UserLongevityVoteResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Longevity vote not found.' })
  async updateLongevityVote(
    @Param('id') id: number,
    @Body() updateDto: UpdateUserLongevityVoteDto,
  ): Promise<UserLongevityVoteResponseDto> {
    const vote = await this.userLongevityVoteService.updateLongevityVote(
      id,
      updateDto,
    );
    return plainToInstance(UserLongevityVoteResponseDto, vote);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a longevity vote by ID' })
  @ApiResponse({
    status: 200,
    description: 'The longevity vote has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Longevity vote not found.' })
  async removeLongevityVote(@Param('id') id: number): Promise<void> {
    return this.userLongevityVoteService.removeLongevityVote(id);
  }
}
