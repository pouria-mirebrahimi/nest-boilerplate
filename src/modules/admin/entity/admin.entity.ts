import { Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 120 })
  public name: string;

  @Column({ type: 'varchar', length: 120 })
  public email: string;

  @Column({ default: false })
  public isDeleted: boolean;

  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;
}
