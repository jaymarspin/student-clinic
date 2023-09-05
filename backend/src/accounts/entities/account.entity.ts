import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity('accounts')
export class AccountEntity {
    @PrimaryGeneratedColumn('increment') id: number;


    @Column({type: 'varchar'})
    fisrtname: string;
    @Column({type: 'varchar'})
    lastname: string;
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
    username: string;
  
    @Column({ type: 'json',nullable: true })
    extra: any;
  
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
   
   
}
