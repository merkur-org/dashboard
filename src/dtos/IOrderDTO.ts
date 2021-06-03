export type IPaymentStatus =
  | 'processing'
  | 'awaiting_payment'
  | 'canceled'
  | 'expired'
  | 'paid'

export type IPaymentType =
  | 'credit_card'
  | 'money'
  | 'pix'
  | 'bank_slip'
  | 'bank_transfer'

export type ISalesType = 'wholesale' | 'retail'

export interface IOrderDTO {
  date: Date
  value: number
  final_value: number
  payment_type: IPaymentType
  payment_status: IPaymentStatus
  sales_type: ISalesType
  delivery_point_id: string
  list_id: string
  order_details: {
    product_id: string
    quantity: number
    discount: number
  }[]
}

export interface ICreateOrderDTO {
  delivery_point_id: string
  list_id: string
  final_value: number
  payment_status: IPaymentStatus
  payment_type: IPaymentType
  sales_type: ISalesType
  value: number
  details: {
    product_id: string
    quantity: number
    discount: number
  }[]
}
