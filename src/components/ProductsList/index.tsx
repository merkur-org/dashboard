import { Datagrid, List, NumberField, TextField } from 'ra-ui-materialui'
import * as React from 'react'

const ProductsList: React.FC = props => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="unit_sale" />
        <TextField source="category" />
        <TextField source="unit_buy" />
        <NumberField source="fraction_buy" />
        <NumberField source="fraction_sale" />
        <NumberField source="cost_price" />
        <NumberField source="sale_price" />
      </Datagrid>
    </List>
  )
}
export default ProductsList
