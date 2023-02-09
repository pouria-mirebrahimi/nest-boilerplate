import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

// locals
import { UsersService } from '../service/users.service';
import { UsersRepository } from '../repository/users.repository';
import mockUsers from './mock-users';

describe('User ::: testing service', () => {
  let service: UsersService;
  let repository: UsersRepository;

  const mockUserRepository = {
    queryAllEntities: jest.fn(() => mockUsers),
    queryOneById: jest.fn((id) => {
      const entity = mockUsers.filter((user) => user.id === id);
      if (entity.length === 0) return undefined;
      return entity;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UsersRepository),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(
      getRepositoryToken(UsersRepository),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should be called and return two user items', async () => {
    const found = await service.findAllUsers();
    expect(found).toEqual(mockUsers);

    expect(mockUserRepository.queryAllEntities).toHaveBeenCalled();
  });

  it('should be called and return a user item based on ID', async () => {
    const id = 1;
    const mockUser = mockUsers.filter((user) => user.id === id);
    const found = await service.getUserById(id);
    expect(found).toEqual(mockUser);

    expect(mockUserRepository.queryOneById).toHaveBeenCalledWith(id);
  });

  it('should be called and return a NotFoundException', async () => {
    expect(service.getUserById(-1)).rejects.toThrow(NotFoundException);
  });
});
