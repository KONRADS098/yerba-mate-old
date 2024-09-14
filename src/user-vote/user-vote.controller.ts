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
import { plainToInstance } from 'class-transformer';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  UserFlavorVoteResponseDto,
  CreateUserFlavorVoteDto,
  UpdateUserFlavorVoteDto,
  UserLongevityVoteResponseDto,
  CreateUserLongevityVoteDto,
  UpdateUserLongevityVoteDto,
  UserTemperatureVoteResponseDto,
  CreateUserTemperatureVoteDto,
  UpdateUserTemperatureVoteDto,
} from './user-vote.dto';

@ApiTags('user-vote')
@Controller('user-vote')
export class UserVoteController {
  constructor(private readonly userVoteService: UserVoteService) {}

  // Flavor Vote Endpoints
  @Post('flavor')
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
    const vote = await this.userVoteService.createFlavorVote(createDto);
    return plainToInstance(UserFlavorVoteResponseDto, vote);
  }

  @Get('flavor')
  @ApiOperation({ summary: 'Get all flavor votes' })
  @ApiResponse({
    status: 200,
    description: 'Return all flavor votes.',
    type: [UserFlavorVoteResponseDto],
  })
  async findAllFlavorVotes(): Promise<UserFlavorVoteResponseDto[]> {
    const votes = await this.userVoteService.findAllFlavorVotes();
    return votes.map((vote) =>
      plainToInstance(UserFlavorVoteResponseDto, vote),
    );
  }

  @Get('flavor/:id')
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
    const vote = await this.userVoteService.findOneFlavorVote(id);
    return plainToInstance(UserFlavorVoteResponseDto, vote);
  }

  @Put('flavor/:id')
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
    const vote = await this.userVoteService.updateFlavorVote(id, updateDto);
    return plainToInstance(UserFlavorVoteResponseDto, vote);
  }

  @Delete('flavor/:id')
  @ApiOperation({ summary: 'Delete a flavor vote by ID' })
  @ApiResponse({
    status: 200,
    description: 'The flavor vote has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Flavor vote not found.' })
  async removeFlavorVote(@Param('id') id: number): Promise<void> {
    return this.userVoteService.removeFlavorVote(id);
  }

  // Longevity Vote Endpoints
  @Post('longevity')
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
    const vote = await this.userVoteService.createLongevityVote(createDto);
    return plainToInstance(UserLongevityVoteResponseDto, vote);
  }

  @Get('longevity')
  @ApiOperation({ summary: 'Get all longevity votes' })
  @ApiResponse({
    status: 200,
    description: 'Return all longevity votes.',
    type: [UserLongevityVoteResponseDto],
  })
  async findAllLongevityVotes(): Promise<UserLongevityVoteResponseDto[]> {
    const votes = await this.userVoteService.findAllLongevityVotes();
    return votes.map((vote) =>
      plainToInstance(UserLongevityVoteResponseDto, vote),
    );
  }

  @Get('longevity/:id')
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
    const vote = await this.userVoteService.findOneLongevityVote(id);
    return plainToInstance(UserLongevityVoteResponseDto, vote);
  }

  @Put('longevity/:id')
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
    const vote = await this.userVoteService.updateLongevityVote(id, updateDto);
    return plainToInstance(UserLongevityVoteResponseDto, vote);
  }

  @Delete('longevity/:id')
  @ApiOperation({ summary: 'Delete a longevity vote by ID' })
  @ApiResponse({
    status: 200,
    description: 'The longevity vote has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Longevity vote not found.' })
  async removeLongevityVote(@Param('id') id: number): Promise<void> {
    return this.userVoteService.removeLongevityVote(id);
  }

  // Temperature Vote Endpoints
  @Post('temperature')
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
    const vote = await this.userVoteService.createTemperatureVote(createDto);
    return plainToInstance(UserTemperatureVoteResponseDto, vote);
  }

  @Get('temperature')
  @ApiOperation({ summary: 'Get all temperature votes' })
  @ApiResponse({
    status: 200,
    description: 'Return all temperature votes.',
    type: [UserTemperatureVoteResponseDto],
  })
  async findAllTemperatureVotes(): Promise<UserTemperatureVoteResponseDto[]> {
    const votes = await this.userVoteService.findAllTemperatureVotes();
    return votes.map((vote) =>
      plainToInstance(UserTemperatureVoteResponseDto, vote),
    );
  }

  @Get('temperature/:id')
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
    const vote = await this.userVoteService.findOneTemperatureVote(id);
    return plainToInstance(UserTemperatureVoteResponseDto, vote);
  }

  @Put('temperature/:id')
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
    const vote = await this.userVoteService.updateTemperatureVote(
      id,
      updateDto,
    );
    return plainToInstance(UserTemperatureVoteResponseDto, vote);
  }

  @Delete('temperature/:id')
  @ApiOperation({ summary: 'Delete a temperature vote by ID' })
  @ApiResponse({
    status: 200,
    description: 'The temperature vote has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Temperature vote not found.' })
  async removeTemperatureVote(@Param('id') id: number): Promise<void> {
    return this.userVoteService.removeTemperatureVote(id);
  }
}
