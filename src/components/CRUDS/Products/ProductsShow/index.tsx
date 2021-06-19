import {
  DeleteButton,
  ListButton,
  RichTextField,
  SelectField,
  Show,
  ShowProps,
  SimpleShowLayout,
  TextField
} from 'ra-ui-materialui'
import React from 'react'
import { categories, units } from '../ProductsSelect'

const ProductsShow: React.FC = props => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <ListButton label="Voltar" basePath="/products" />
        <TextField source="name" label="Nome" />
        <TextField
          source="cost_price"
          label="Preço de custo"
          placeholder="R$"
        />
        <SelectField source="category" label="Categoria" choices={categories} />
        <TextField
          source="wholesale_price"
          label="Preço de atacado"
          placeholder="R$"
        />
        <SelectField
          source="unit_buy"
          label="Unidade de compra"
          choices={units}
        />
        <TextField source="fraction_buy" label="Fração de compra" />
        <SelectField
          source="unit_sale"
          label="Unidade de venda"
          choices={units}
        />
        <TextField source="fraction_sale" label="Fração de venda" />
        <TextField
          source="sale_price"
          label="Preço de venda"
          placeholder="R$"
        />
        <RichTextField source="observation" label="Observação" />
      </SimpleShowLayout>
    </Show>
  )
}

export default ProductsShow
