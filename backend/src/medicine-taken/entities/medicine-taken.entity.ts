import { DosageEntity } from 'src/dosages/entities/dosage.entity';
import { StudentEntity } from 'src/students/entities/student.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('medicinetaken')
export class MedicineTakenEntity {
  @PrimaryGeneratedColumn('increment') id: number;
  @Column({
    nullable: false,
  })
  description: string;

  @Column({
    nullable: true,
  })
  action?: string;

  @Column({
    nullable: true,
  })
  quantity?: number;

  @ManyToOne(() => StudentEntity, (student) => student.id)
  student: StudentEntity;

  @ManyToOne(() => DosageEntity, (dosage) => dosage.id)
  dosage: DosageEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
