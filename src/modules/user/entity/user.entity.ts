import { Role } from '../../role/entity/role.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 120 })
  public name: string;

  @Column({ type: 'varchar', length: 120 })
  public email: string;

  @Column({ default: false })
  public isDeleted: boolean;

  /**
   * Relations
   */

  // @OneToOne(() => Role, (role) => role.user)
  // role: Role;

  // @ManyToOne(() => Role, (role) => role.users, { cascade: ['update'] })
  // role: Role;

  @ManyToMany(() => Role, (role) => role.users, { cascade: ['update'] })
  @JoinTable({ name: 'relation_user_role' })
  roles: Role[];

  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;
}
