export interface IDeposit {
  id?: number
  depositOrderId?: number
  voucherNumber: string
  amount: number | string
  date: Date | null
  bank: string
  description: string
}
