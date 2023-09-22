export interface Inventories {
    medicinename: string;
    indication: string;
    created_at?: string;
    updated_at?: string;
    stocks?: Stocks[];
    dosage?: Dosage[];
    id?: number
  }


  export interface Stocks {
    stocks: number;
    created_at?: string;
    updated_at?: string;
  }


  export interface Dosage {
    dosage: string;
    stocks?: Stocks | any;
    created_at?: string;
    updated_at?: string;
    id?: number
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
  