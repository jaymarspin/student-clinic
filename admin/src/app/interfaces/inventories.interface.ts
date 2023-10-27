export interface Inventories {
    medicinename: string;
    maxcount?: number;
    indication: string;
    created_at?: string;
    updated_at?: string;
    stocks?: Stocks[];
    dosage?: Dosage[];
    id?: number;
    medicinetaken?: any
  }

  export interface InventoriesDialog {
    inventories?: Inventories;
    edit: boolean
  }


  export interface Stocks {
    id?: number;
    stocks: number;
    created_at?: string;
    updated_at?: string;
  }


  export interface Dosage {
    dosage: string;
    stocks?: Stocks | any;
    created_at?: string;
    updated_at?: string;
    id?: any;
    
  }

  export interface medicineData{
    description: string;
    dosageVal: number;
    student: number;
    dosage?: Dosage;
    action?: string;
    medicine?: Dosage
    quantity?: number;
    inventories?: Inventories;
    inventoriesVal?: number;
    date?: string
  }
  