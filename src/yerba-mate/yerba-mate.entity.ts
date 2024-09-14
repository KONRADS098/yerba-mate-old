import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  ManyToMany,
  JoinColumn,
} from 'typeorm';
import { Brand } from '../brand/brand.entity';
import { Origin } from '../origin/origin.entity';
import { ProcessingMethod } from '../processing-method/processing-method.entity';
import {
  UserFlavorVote,
  UserTemperatureVote,
  UserLongevityVote,
} from '../user-vote/user-vote.entity';

@Entity()
export class YerbaMate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  brandId!: number;

  @ManyToOne(() => Brand, (brand) => brand.yerbaMates)
  @JoinColumn({ name: 'brandId' })
  brand!: Brand;

  @Column()
  originId!: number;

  @ManyToOne(() => Origin, (origin) => origin.yerbaMates)
  @JoinColumn({ name: 'originId' })
  origin!: Origin;

  @ManyToMany(
    () => ProcessingMethod,
    (processingMethod) => processingMethod.yerbaMates,
  )
  @JoinTable({
    name: 'yerbaMateProcessingMethod',
    joinColumn: { name: 'yerbaMateId', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'processingMethodId',
      referencedColumnName: 'id',
    },
  })
  processingMethods!: ProcessingMethod[];

  @Column({ type: 'text', nullable: true })
  description!: string;

  @OneToMany(() => UserFlavorVote, (userFlavorVote) => userFlavorVote.yerbaMate)
  userFlavorVotes!: UserFlavorVote[];

  @OneToMany(
    () => UserTemperatureVote,
    (userTemperatureVote) => userTemperatureVote.yerbaMate,
  )
  userTemperatureVotes!: UserTemperatureVote[];

  @OneToMany(
    () => UserLongevityVote,
    (userLongevityVote) => userLongevityVote.yerbaMate,
  )
  userLongevityVotes!: UserLongevityVote[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
