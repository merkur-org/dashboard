import {
  Datagrid,
  List,
  NumberField,
  TextField,
  EditButton,
  ShowButton
} from 'ra-ui-materialui'
import * as React from 'react'

const ProductsList: React.FC = props => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="name" label="Nome" />
        <TextField source="category" />
        <TextField source="unit_buy" label="Unidade de compra" />
        <TextField source="unit_sale" label="Unidade de venda" />
        <NumberField source="fraction_buy" label="Fração de compra" />
        <NumberField source="fraction_sale" label="Fração de venda" />
        <NumberField source="cost_price" label="Preço de compra (R$)" />
        <NumberField source="sale_price" label="Preço de venda (R$)" />
        <EditButton />
      </Datagrid>
    </List>
  )
}
export default ProductsList
