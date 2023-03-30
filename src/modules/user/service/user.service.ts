import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/user.dto';
import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';
import { UserViewRepository } from '../repository/user.view.repository';
import { UserView } from '../view/user.view';

@Injectable()
export class UserService {
  @InjectRepository(UserRepository)
  private readonly repository: UserRepository;
  @InjectRepository(UserViewRepository)
  private readonly userViewRepo: UserViewRepository;

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
