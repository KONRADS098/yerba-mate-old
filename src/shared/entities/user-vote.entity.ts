import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Check,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Flavor } from './flavor.entity';
import { YerbaMate } from './yerba-mate.entity';

@Entity()
export class UserFlavorVote {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @ManyToOne(() => User, (user) => user.flavorVotes)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column()
  yerbaMateId!: number;

  @ManyToOne(() => YerbaMate, (yerbaMate) => yerbaMate.userFlavorVotes)
  @JoinColumn({ name: 'yerbaMateId' })
  yerbaMate!: YerbaMate;

  @Column()
  flavorId!: number;

  @ManyToOne(() => Flavor, (flavor) => flavor.userFlavorVotes)
  @JoinColumn({ name: 'flavorId' })
  flavor!: Flavor;

  @Column()
  score!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

@Entity()
export class UserLongevityVote {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @ManyToOne(() => User, (user) => user.longevityVotes)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column()
  yerbaMateId!: number;

  @ManyToOne(() => YerbaMate, (yerbaMate) => yerbaMate.userLongevityVotes)
  @JoinColumn({ name: 'yerbaMateId' })
  yerbaMate!: YerbaMate;

  @Column('float')
  @Check(`liters >= 0 AND liters <= 5`)
  liters!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

@Entity()
export class UserTemperatureVote {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @ManyToOne(() => User, (user) => user.temperatureVotes)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column()
  yerbaMateId!: number;

  @ManyToOne(() => YerbaMate, (yerbaMate) => yerbaMate.userTemperatureVotes)
  @JoinColumn({ name: 'yerbaMateId' })
  yerbaMate!: YerbaMate;

  @Column('int')
  @Check(`temperature >= 0 AND temperature <= 100`)
  temperature!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
