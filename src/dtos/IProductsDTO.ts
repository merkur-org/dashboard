export interface IProductsDTO {
  id: string
  name: string
  category: string
  image: string
  image_url: string
  nutritional_information: string
  observation: string
  unit_sale: string
  unit_buy: string
  fraction_buy: number
  fraction_sale: number
  cost_price: number
  sale_price: number
  wholesale_price: number
  organic: boolean
  highlights: boolean
  created_at: string
  updated_at: string
  quantity?: number
}
