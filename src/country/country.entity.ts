import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Brand } from '../brand/brand.entity';
import { Origin } from '../origin/origin.entity';

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ length: 2 })
  code!: string;

  @OneToMany(() => Brand, (brand) => brand.country)
  brands!: Brand[];

  @OneToMany(() => Origin, (origin) => origin.country)
  origins!: Origin[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
