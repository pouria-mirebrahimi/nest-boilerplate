import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// locals
import { AdminRepository } from '../repository/admin.repository';
import { Users } from '../../user/entity/users.entity';

@Injectable()
export class AdminService {
  @InjectRepository(AdminRepository)
  private readonly repository: AdminRepository;

  async onlyAdminRequest(id: number): Promise<Users> {
    return await this.repository.queryOneById(id);
  }
}
