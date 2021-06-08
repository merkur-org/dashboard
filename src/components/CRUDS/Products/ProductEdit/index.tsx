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
        />
        <SelectInput source="category" label="Categoria" choices={categories} />
        <TextInput
          source="wholesale_price"
          label="Preço de atacado"
          placeholder="R$"
        />
        <SelectInput
          source="unit_buy"
          label="Unidade de compra"
          choices={units}
        />
        <TextInput source="fraction_buy" label="Fração de compra" />
        <SelectInput
          source="unit_sale"
          label="Unidade de venda"
          choices={units}
        />
        <TextInput source="fraction_sale" label="Fração de venda" />
        <TextInput
          source="sale_price"
          label="Preço de venda"
          placeholder="R$"
        />
        <TextInput source="observation" label="Observação" multiline />
      </Form>
    </Edit>
  )
}

export default ProductEdit
