import { FindOneOptions } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { DataSource } from 'typeorm';
import { UpdateResult } from 'typeorm';
// entity
import { Role } from '../entity/role.entity';
import { User } from '../../user/entity/user.entity';
// repository
import { AbstractRepository } from '../../../common/lib/repository/abstract-repository';

@Injectable()
export class RoleRepository extends AbstractRepository<Role> {
  constructor(private dataSource: DataSource) {
    super(Role, dataSource);
  }

  async queryAddUserToRole(
    option: FindOneOptions,
    userEntity: QueryDeepPartialEntity<User>,
  ): Promise<UpdateResult> {
    const found = await this.queryOneByOption(option);
    if (found) {
      found.users.push(<User>{ id: userEntity.id });
      await this.save(found);
    }

    return {
      raw: undefined,
      generatedMaps: [],
      affected: found ? 1 : 0,
    };
  }
}
