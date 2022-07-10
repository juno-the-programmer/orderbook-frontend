export interface OrderModel {
  quote: string;
  size: number;
  sizeDiff: 'increase' | 'decrease' | 'none';
  total: number;
  type: 'snapshot' | 'delta' | 'update' | 'new' | 'delete';
}
