import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// entity
import { User } from '../entity/user.entity';
import { UserView } from '../view/user.view';
// repository
import { UserRepository } from '../repository/user.repository';
import { UserViewRepository } from '../repository/user.view.repository';
// dto
import { CreateUserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly repository: UserRepository,
    @InjectRepository(UserViewRepository)
    private readonly userViewRepo: UserViewRepository,
  ) {}

  /**
   * @description   Fetching all users using the base repository
   *                queries defined in the repository of User.
   *
   * @returns       A list of all user entities.
   */
  async fetchAllUsers(): Promise<User[]> {
    return await this.repository.queryAllUsersAndCountRoles();
  }

  async fetchAllUsersView(): Promise<UserView[]> {
    return await this.userViewRepo.queryAllEntities();
  }

  async fetchUserById(id: number): Promise<User | undefined> {
    const result = await this.repository.queryOneByOption({
      relations: ['roles'],
      where: {
        id,
      },
    });

    if (!result) throw new NotFoundException();

    return result;
  }

  async createUser(body: CreateUserDto): Promise<User | undefined> {
    return await this.repository.createEntity(body);
  }
}
