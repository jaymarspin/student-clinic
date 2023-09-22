import { DosageEntity } from 'src/dosages/entities/dosage.entity';
import { MedicineTakenEntity } from 'src/medicine-taken/entities/medicine-taken.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('inventories')
export class InventoriesEntity {
  @PrimaryGeneratedColumn('increment') id: number;
  @Column({
    type: 'varchar',
    nullable: false,
  })
  medicinename: string;

  @Column({ nullable: true })
  indication: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'json', nullable: true })
  extra: any;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => DosageEntity, (dosage) => dosage.inventories, { nullable: true, onDelete: "CASCADE" })
  dosage: DosageEntity;

  @OneToMany(() => MedicineTakenEntity, (medicinetaken) => medicinetaken.inventories, { nullable: true, onDelete: "CASCADE" })
  medicinetaken: MedicineTakenEntity;
}
