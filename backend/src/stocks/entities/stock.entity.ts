import { DosageEntity } from 'src/dosages/entities/dosage.entity'; 
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('stocks')
export class StocksEntity {
  @PrimaryGeneratedColumn('increment') id?: string;
  @Column({
    nullable: false,
  })
  stocks: number;

  @ManyToOne(() => DosageEntity, (dosage) => dosage.id)
  dosage: DosageEntity;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
