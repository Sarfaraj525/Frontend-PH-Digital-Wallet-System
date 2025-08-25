export interface Transaction {
  _id: string;
  type: string;
  amount: number;
  createdAt: string;
}

export interface TransactionMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface TransactionResponse {
  data: Transaction[];
  meta: TransactionMeta;
}
