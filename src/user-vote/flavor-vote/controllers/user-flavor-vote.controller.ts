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
import { UserFlavorVoteService } from '../services/user-flavor-vote.service';
import { UserFlavorVoteResponseDto } from '../dtos/user-flavor-vote-response.dto';
import { CreateUserFlavorVoteDto } from '../dtos/create-user-flavor-vote.dto';
import { UpdateUserFlavorVoteDto } from '../dtos/update-user-flavor-vote.dto';

@ApiTags('user-vote')
@Controller('user-flavor-vote')
export class UserFlavorVoteController {
  constructor(private readonly userFlavorVoteService: UserFlavorVoteService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new flavor vote' })
  @ApiResponse({
    status: 201,
    description: 'The flavor vote has been successfully created.',
    type: UserFlavorVoteResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createFlavorVote(
    @Body() createDto: CreateUserFlavorVoteDto,
  ): Promise<UserFlavorVoteResponseDto> {
    const vote = await this.userFlavorVoteService.createFlavorVote(createDto);
    return plainToInstance(UserFlavorVoteResponseDto, vote);
  }

  @Get()
  @ApiOperation({ summary: 'Get all flavor votes' })
  @ApiResponse({
    status: 200,
    description: 'Return all flavor votes.',
    type: [UserFlavorVoteResponseDto],
  })
  async findAllFlavorVotes(): Promise<UserFlavorVoteResponseDto[]> {
    const votes = await this.userFlavorVoteService.findAllFlavorVotes();
    return votes.map((vote) =>
      plainToInstance(UserFlavorVoteResponseDto, vote),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a flavor vote by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the flavor vote with the given ID.',
    type: UserFlavorVoteResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Flavor vote not found.' })
  async findOneFlavorVote(
    @Param('id') id: number,
  ): Promise<UserFlavorVoteResponseDto> {
    const vote = await this.userFlavorVoteService.findOneFlavorVote(id);
    return plainToInstance(UserFlavorVoteResponseDto, vote);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a flavor vote by ID' })
  @ApiResponse({
    status: 200,
    description: 'The flavor vote has been successfully updated.',
    type: UserFlavorVoteResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Flavor vote not found.' })
  async updateFlavorVote(
    @Param('id') id: number,
    @Body() updateDto: UpdateUserFlavorVoteDto,
  ): Promise<UserFlavorVoteResponseDto> {
    const vote = await this.userFlavorVoteService.updateFlavorVote(
      id,
      updateDto,
    );
    return plainToInstance(UserFlavorVoteResponseDto, vote);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a flavor vote by ID' })
  @ApiResponse({
    status: 200,
    description: 'The flavor vote has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Flavor vote not found.' })
  async removeFlavorVote(@Param('id') id: number): Promise<void> {
    return this.userFlavorVoteService.removeFlavorVote(id);
  }
}
