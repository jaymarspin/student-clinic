import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('increment') id: string;
  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;
 
  @Column({ default: true })
  isActive: boolean;

  @Column({
    unique: true,
  })
  email: string;

  @Column({ type: 'json',nullable: true })
  extra: any;


  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
 
 
}
