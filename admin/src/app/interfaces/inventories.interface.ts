export interface Inventories {
    medicinename: string;
    indication: string;
    created_at?: string;
    updated_at?: string;
    stocks?: Stocks[];
    dosage?: Dosage[];
  }


  export interface Stocks {
    stocks: number;
    created_at?: string;
    updated_at?: string;
  }


  export interface Dosage {
    dosage: string;
    created_at?: string;
    updated_at?: string;
  }
  