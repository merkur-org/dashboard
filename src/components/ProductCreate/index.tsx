import { Create, SimpleForm, TextInput, SelectInput } from 'react-admin'
import React from 'react'

const ProductCreate: React.FC = props => {
  return (
    <Create title="Adicionar novo produto" {...props}>
      <SimpleForm>
        <TextInput source="name" label="Nome" />
        <TextInput source="cost_price" />
        <TextInput source="sale_price" />
        <TextInput source="category" />
        <TextInput source="unit_buy" />
        <TextInput source="unit_sale" />
        <TextInput source="fraction_buy" />
        <TextInput source="fraction_sale" />
        <TextInput source="wholesale_price" />
        <TextInput source="observation" />
      </SimpleForm>
    </Create>
  )
}

export default ProductCreate
