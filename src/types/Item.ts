export interface Item {
  id: number;
  name: string;
  description: string;
  status: 'AVAILABLE' | 'RENTED' | 'REPAIR';
}
