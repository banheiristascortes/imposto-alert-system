export interface TaxChange {
  id: string;
  state: string;
  type: string;
  description: string;
  date: string;
  status: "pending" | "approved" | "rejected";
}

export interface TaxReport {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  changes: TaxChange[];
}