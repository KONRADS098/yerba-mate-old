import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {
  UserFlavorVote,
  UserTemperatureVote,
  UserLongevityVote,
} from './user-vote.entity';
import { UserRole } from '../../user/user-role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

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
