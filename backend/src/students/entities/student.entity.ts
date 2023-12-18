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
  
  @Entity('student')
  export class StudentEntity {
    @PrimaryGeneratedColumn('increment') id: number;
    @Column({
      type: 'varchar',
      nullable: false,
    })
    fullname: string;

    @Column({
      type: 'varchar',
      nullable: false,
    })
    emergencyContactNo: string;

    @Column({
      type: 'date',
      nullable: true,
    })
    date_added?: Date;
  
    @Column({
      type: 'varchar',
      nullable: false,
      unique: true
    })
    email: string;

    @Column({
      
      nullable: true,
    })
    notes: string;
  
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

      
    @Column({
      type: 'varchar',
      nullable: false,
    })
    graderole: string;


    @Column({ default: false })
    deleted: boolean;

    
   
    @Column({ default: true })
    isActive: boolean;

    @Column({ type: 'json',nullable: true })
    extra: any;
  
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
   
   
  }
  