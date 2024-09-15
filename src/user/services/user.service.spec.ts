import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../shared/entities/user.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a user with hashed password', async () => {
      const createUserDto: CreateUserDto = {
        username: 'test',
        email: 'test@test.com',
        password: 'password',
      };
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
      const user = { id: 1, ...createUserDto, password: hashedPassword };

      jest.spyOn(bcrypt, 'genSalt').mockImplementation(async () => salt);
      jest.spyOn(bcrypt, 'hash').mockImplementation(async () => hashedPassword);
      jest.spyOn(repository, 'create').mockReturnValue(user as any);
      jest.spyOn(repository, 'save').mockResolvedValue(user as any);

      expect(await service.create(createUserDto)).toEqual(user);
      expect(bcrypt.genSalt).toHaveBeenCalled();
      expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, salt);
      expect(repository.create).toHaveBeenCalledWith({
        ...createUserDto,
        password: hashedPassword,
      });
      expect(repository.save).toHaveBeenCalledWith(user);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [{ id: 1, username: 'test', email: 'test@test.com' }];
      jest.spyOn(repository, 'find').mockResolvedValue(users as any);

      expect(await service.findAll()).toEqual(users);
      expect(repository.find).toHaveBeenCalledWith({
        relations: ['flavorVotes', 'temperatureVotes', 'longevityVotes'],
      });
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const user = { id: 1, username: 'test', email: 'test@test.com' };
      jest.spyOn(repository, 'findOne').mockResolvedValue(user as any);

      expect(await service.findOne(1)).toEqual(user);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['flavorVotes', 'temperatureVotes', 'longevityVotes'],
      });
    });

    it('should throw NotFoundException if user not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByEmailOrUsername', () => {
    it('should return a user by email or username', async () => {
      const user = { id: 1, username: 'test', email: 'test@test.com' };
      jest.spyOn(repository, 'findOne').mockResolvedValue(user as any);

      expect(await service.findByEmailOrUsername('test')).toEqual(user);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: [{ email: 'test' }, { username: 'test' }],
      });
    });

    it('should throw NotFoundException if user not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findByEmailOrUsername('test')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = { username: 'updated' };
      const user = { id: 1, ...updateUserDto };

      jest
        .spyOn(repository, 'update')
        .mockResolvedValue({ affected: 1 } as any);
      jest.spyOn(service, 'findOne').mockResolvedValue(user as any);

      expect(await service.update(1, updateUserDto)).toEqual(user);
      expect(repository.update).toHaveBeenCalledWith(1, updateUserDto);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if user not found', async () => {
      const updateUserDto: UpdateUserDto = { username: 'updated' };

      jest
        .spyOn(repository, 'update')
        .mockResolvedValue({ affected: 0 } as any);

      await expect(service.update(1, updateUserDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ affected: 1 } as any);

      await service.remove(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if user not found', async () => {
      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ affected: 0 } as any);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
