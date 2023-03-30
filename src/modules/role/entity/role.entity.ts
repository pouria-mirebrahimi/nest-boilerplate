import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// entity
import { User } from '../../user/entity/user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  /**
   * @description: Relations
   */

  @ManyToMany(() => User, (user) => user.roles, { cascade: ['update'] })
  users: User[];
}
