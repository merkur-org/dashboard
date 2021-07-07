import {
  ListButton,
  RichTextField,
  ImageField,
  Show,
  TextField,
  FunctionField
} from 'ra-ui-materialui'
import React from 'react'
import { ShowActionsProps, TitleProps, Toolbar } from 'react-admin'
import { MdArrowBack } from 'react-icons/md'

import { ShowData } from './styles'

const ProductShowActions = (props: ShowActionsProps) => {
  return (
    <Toolbar>
      <ListButton label="voltar" icon={<MdArrowBack />} />
    </Toolbar>
  )
}

const ProductShowTitle = ({ record }: TitleProps) => {
  return <span>{record.name}</span>
}

const ProductsShow: React.FC = props => {
  return (
    <Show
      {...props}
      actions={<ProductShowActions />}
      title={<ProductShowTitle />}
    >
      <ShowData>
        <ImageField source="image_url" label="" />
        <TextField source="name" label="Nome" />
        <FunctionField
          source="organic"
          label="Tipo do produto"
          render={record =>
            record.organic
              ? 'Este produto é orgânico'
              : 'Este produto não é orgânico'
          }
        />
        <TextField source="category" label="Categoria" />
        <TextField source="unit_buy" label="Unidade de compra" />
        <TextField source="unit_sale" label="Unidade de venda" />
        <FunctionField
          source="cost_price"
          label="Preço de custo"
          render={record => `R$ ${record.cost_price.toFixed(2)}`}
        />
        <FunctionField
          source="wholesale_price"
          label="Preço de atacado"
          render={record => `R$ ${record.wholesale_price.toFixed(2)}`}
        />
        <FunctionField
          source="sale_price"
          label="Preço de venda"
          render={record => `R$ ${record.sale_price.toFixed(2)}`}
        />
        <TextField source="fraction_buy" label="Fração de compra" />
        <TextField source="fraction_sale" label="Fração de venda" />
        <RichTextField source="observation" label="Observação" />
      </ShowData>
    </Show>
  )
}

export default ProductsShow
