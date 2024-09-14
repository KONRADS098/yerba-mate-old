import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Country } from './country.entity';
import { YerbaMate } from './yerba-mate.entity';

@Entity()
export class Origin {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  countryId!: number;

  @ManyToOne(() => Country, (country) => country.origins)
  @JoinColumn({ name: 'countryId' })
  country!: Country;

  @Column({ nullable: true })
  region!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @OneToMany(() => YerbaMate, (yerbaMate) => yerbaMate.origin)
  yerbaMates!: YerbaMate[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
