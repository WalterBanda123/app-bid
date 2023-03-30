export interface Bid {
  _id: string;
  isActive: boolean;
  percentage: number;
  amount: number;
  _itemId: string;
  _userId: string;
}
