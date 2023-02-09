import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/users.dto';
import { Users } from '../entity/users.entity';
import { UsersRepository } from '../repository/users.repository';

@Injectable()
export class UsersService {
  @InjectRepository(UsersRepository)
  private readonly repository: UsersRepository;

  async findAllUsers(): Promise<Users[]> {
    return await this.repository.queryAllEntities();
  }

  async getUserById(id: number): Promise<Users | undefined> {
    const result = await this.repository.queryOneById(id);

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  async createUser(body: CreateUserDto): Promise<Users | undefined> {
    return await this.repository.createEntity(body);
  }
}
