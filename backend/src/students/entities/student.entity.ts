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
  
  @Entity('students')
  export class StudentsEntity {
    @PrimaryGeneratedColumn('increment') id: string;
    @Column({
      type: 'varchar',
      nullable: false,
    })
    fullname: string;
  
    @Column({
      type: 'varchar',
      nullable: false,
    })
    email: string;
  
    @Column({
      type: 'date',
      nullable: false,
    })
    bdate: any;
  
    @Column({
      type: 'varchar',
      nullable: false,
    })
    grade: string;
   
    @Column({ default: true })
    isActive: boolean;

    @Column({ type: 'json',nullable: true })
    extra: any;
  
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
   
   
  }
  