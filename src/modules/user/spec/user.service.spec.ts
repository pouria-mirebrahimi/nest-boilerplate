import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

// locals
import { UserService } from '../service/user.service';
import { UserRepository } from '../repository/user.repository';
import mockUsers from './mock-users';

describe('User ::: testing service', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  const mockUserRepository = {
    queryAllEntities: jest.fn(() => mockUsers),
    queryOneById: jest.fn((id) => {
      const entity = mockUsers.filter((user) => user.id === id);
      if (entity.length === 0) return undefined;
      return entity;
    }),
    queryOneByOption: jest.fn((option) => {
      const id = option.where.id;
      const entity = mockUsers.filter((user) => user.id === id);
      if (entity.length === 0) return undefined;
      return entity;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserRepository),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(
      getRepositoryToken(UserRepository),
    );
  });

  xit('should be defined', () => {
    expect(userService).toBeDefined();
  });

  xit('should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  xit('should be called and return two user items', async () => {
    const found = await userService.fetchAllUsers();
    expect(found).toEqual(mockUsers);

    expect(mockUserRepository.queryAllEntities).toHaveBeenCalled();
  });

  xit('should be called and return a user item based on ID', async () => {
    const id = 1;
    const mockUser = mockUsers.filter((user) => user.id === id);
    const found = await userService.fetchUserById(id);
    expect(found).toEqual(mockUser);

    expect(mockUserRepository.queryOneByOption).toHaveBeenCalledWith({
      relations: ['roles'],
      where: {
        id,
      },
    });
  });

  it('should be called and return a NotFoundException', async () => {
    await expect(userService.fetchUserById(-1)).rejects.toThrow(
      new NotFoundException(),
    );
  });
});
