import { useState, useEffect } from 'react'
import {
  Datagrid,
  TextFieldProps,
  useRecordContext,
  ArrayField
} from 'react-admin'

import api from '../../../services/api'

import { IProductsDTO } from '../../../dtos/IProductsDTO'
import { IOrderDetailDTO } from '../../../dtos/IOrderDetailDTO'

import { Container } from './styles'

const ProductsField: React.FC<TextFieldProps> = props => {
  const record = useRecordContext(props)
  const [product, setProduct] = useState<IProductsDTO>()

  useEffect(() => {
    async function getProductInfo() {
      const { data } = await api.get<IProductsDTO>(
        `/products/${record.product_id}`
      )

      setProduct(data)
    }

    getProductInfo()
  }, [record])

  return <p>{product && product.name}</p>
}

export default ProductsField
