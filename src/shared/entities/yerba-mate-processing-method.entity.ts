import { ProcessingMethod } from 'src/shared/entities/processing-method.entity';
import { YerbaMate } from 'src/shared/entities/yerba-mate.entity';
import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class YerbaMateProcessingMethod {
  @PrimaryColumn()
  yerbaMateId: number;

  @PrimaryColumn()
  processingMethodId: number;

  @ManyToOne(() => YerbaMate, (yerbaMate) => yerbaMate.processingMethods)
  @JoinColumn([{ name: 'yerbaMateId', referencedColumnName: 'id' }])
  yerbaMates: YerbaMate[];

  @ManyToOne(
    () => ProcessingMethod,
    (processingMethod) => processingMethod.yerbaMates,
  )
  @JoinColumn([{ name: 'processingMethodId', referencedColumnName: 'id' }])
  processingMethods: ProcessingMethod[];
}
