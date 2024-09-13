import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserFlavorVote } from '../user-vote/user-vote.entity';

@Entity()
export class Flavor {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @OneToMany(() => UserFlavorVote, (userFlavorVote) => userFlavorVote.flavor)
  userFlavorVotes!: UserFlavorVote[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
