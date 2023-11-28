 
import { StudentEntity } from 'src/students/entities/student.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('injury')
export class InjuryEntity {
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
    type: 'datetime',
    nullable: true,
  })
  date?: any;

  @ManyToOne(() => StudentEntity, (student) => student.id, {
    onDelete: 'CASCADE',
  })
  student: StudentEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
