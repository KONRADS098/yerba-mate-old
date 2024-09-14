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
export class Brand {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  countryId!: number;

  @ManyToOne(() => Country, (country) => country.brands)
  @JoinColumn({ name: 'countryId' })
  country!: Country;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ nullable: true })
  website!: string;

  @OneToMany(() => YerbaMate, (yerbaMate) => yerbaMate.brand)
  yerbaMates!: YerbaMate[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
