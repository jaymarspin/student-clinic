import { InventoriesEntity } from 'src/inventories/entities/inventory.entity';
import { StocksEntity } from 'src/stocks/entities/stock.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('dosage')
  export class DosageEntity {
    @PrimaryGeneratedColumn('increment') id: number;
    @Column({
      type: 'varchar',
      nullable: false,
    })
    dosage: string;

    @ManyToOne(() => InventoriesEntity, (inventories) => inventories.id)
    inventories: InventoriesEntity;

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => StocksEntity, (stocks) => stocks.dosage, { nullable: true, onDelete: "CASCADE" })
    stocks: StocksEntity;
  }
   