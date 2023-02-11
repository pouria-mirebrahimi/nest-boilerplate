import {
  Column,
  Entity,
  JoinColumn,
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

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
