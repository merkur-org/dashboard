import {
  Datagrid,
  List,
  NumberField,
  TextField,
  EditButton,
  ShowButton,
  ReferenceField,
  ReferenceManyField,
  DeleteButton,
  ImageField,
  FunctionField
} from 'ra-ui-materialui'
import * as React from 'react'

const ProductsList: React.FC = props => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="name" label="Nome" />
        <ImageField source="image_url" label="" />
        <TextField source="category" />
        <TextField source="unit_buy" label="Unidade de compra" />
        <TextField source="unit_sale" label="Unidade de venda" />
        <NumberField source="fraction_buy" label="Fração de compra" />
        <NumberField source="fraction_sale" label="Fração de venda" />
        <FunctionField
          source="cost_price"
          label="Preço de compra"
          render={record => `R$${record.cost_price}`}
        />
        <FunctionField
          source="sale_price"
          label="Preço de venda"
          render={record => `R$${record.sale_price}`}
        />
        <EditButton label="" />
        <DeleteButton label="" />
        <ShowButton label="" />
      </Datagrid>
    </List>
  )
}
export default ProductsList
