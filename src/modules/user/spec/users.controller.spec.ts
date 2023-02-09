import { TestingModule, Test } from '@nestjs/testing';

// locals
import { UsersController } from '../controller/users.controller';
import { UsersService } from '../service/users.service';

describe('User ::: testing controller', () => {
  let controller: UsersController;

  const mockUsersService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });
});
