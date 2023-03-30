import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ManyToMany, JoinTable } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
// entity
import { Role } from '../../role/entity/role.entity';
// decorator
import { VirtualColumn } from '../../../common/lib/decorator/virtual.decorator';

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
   * @description: Virtual fields
   */

  public expired: string;

  @VirtualColumn()
  public fullName: string;

  /**
   * @description: Relations
   */

  @ManyToMany(() => Role, (role) => role.users, { cascade: ['update'] })
  @JoinTable({ name: 'relation_user_role' })
  roles: Role[];

  /**
   * @description: Create and Update Date Columns
   */

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;
}
