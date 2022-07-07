export interface OrderInterface {
  bid: string[];
  asks: string[];
  seqNum: number;
  prevSeqNum: number;
  type: string;
  timestamp: number;
  symbol: string;
}
