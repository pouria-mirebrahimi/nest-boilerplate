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
   * Relations
   */

  // @OneToOne(() => User, (user) => user.role, { cascade: true })
  // @JoinColumn()
  // user: User;

  // @OneToMany(() => User, (user) => user.role, { cascade: ['update'] })
  // users: User[];

  @ManyToMany(() => User, (user) => user.roles, { cascade: ['update'] })
  users: User[];
}
