import { TestingModule, Test } from '@nestjs/testing';

// locals
import { UserController } from '../controller/user.controller';
import { UserService } from '../service/user.service';

describe('User ::: testing controller', () => {
  let controller: UserController;

  const mockUsersService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });
});
