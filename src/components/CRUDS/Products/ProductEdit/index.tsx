import { TextInput, SelectInput, Edit } from 'react-admin'
import React from 'react'

import { Form } from './styles'

import { categories, units } from '../ProductsSelect'

const ProductEdit: React.FC = props => {
  return (
    <Edit title="Adicionar novo produto" {...props}>
      <Form>
        <TextInput source="name" label="Nome" />
        <TextInput
          source="cost_price"
          label="Preço de custo"
          placeholder="R$"
          disabled
        />
        <SelectInput
          source="category"
          label="Categoria"
          choices={categories}
          disabled
        />
        <TextInput
          source="wholesale_price"
          label="Preço de atacado"
          placeholder="R$"
          disabled
        />
        <SelectInput
          source="unit_buy"
          label="Unidade de compra"
          choices={units}
          disabled
        />
        <TextInput source="fraction_buy" label="Fração de compra" disabled />
        <SelectInput
          source="unit_sale"
          label="Unidade de venda"
          choices={units}
          disabled
        />
        <TextInput source="fraction_sale" label="Fração de venda" disabled />
        <TextInput
          source="sale_price"
          label="Preço de venda"
          placeholder="R$"
          disabled
        />
        <TextInput source="observation" label="Observação" multiline disabled />
      </Form>
    </Edit>
  )
}

export default ProductEdit
