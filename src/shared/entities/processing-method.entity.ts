import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { YerbaMate } from './yerba-mate.entity';

@Entity()
export class ProcessingMethod {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @ManyToMany(() => YerbaMate, (yerbaMate) => yerbaMate.processingMethods)
  yerbaMates?: YerbaMate[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
