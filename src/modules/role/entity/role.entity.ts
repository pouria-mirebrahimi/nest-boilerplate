import { Column, Entity, ManyToMany } from 'typeorm';
import { AbstractEntity } from '../../../common/lib/repository/abstract-entity';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Role extends AbstractEntity {
  @Column()
  title: string;

  /**
   * @description: Relations
   */

  @ManyToMany(() => User, (user) => user.roles, { cascade: ['update'] })
  users: User[];
}
