import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {
  UserFlavorVote,
  UserTemperatureVote,
  UserLongevityVote,
} from '../user-vote/user-vote.entity';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role!: UserRole;

  @OneToMany(() => UserFlavorVote, (userFlavorVote) => userFlavorVote.user)
  flavorVotes!: UserFlavorVote[];

  @OneToMany(
    () => UserTemperatureVote,
    (userTemperatureVote) => userTemperatureVote.user,
  )
  temperatureVotes!: UserTemperatureVote[];

  @OneToMany(
    () => UserLongevityVote,
    (userLongevityVote) => userLongevityVote.user,
  )
  longevityVotes!: UserLongevityVote[];
}
