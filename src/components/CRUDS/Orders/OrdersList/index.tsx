import {
  Datagrid,
  DateField,
  List,
  NumberField,
  TextField
} from 'ra-ui-materialui'
import * as React from 'react'

const OrdersList: React.FC = props => {
  return (
    <List {...props}>
      <Datagrid>
        <DateField source="date" label="Data do pedido" />
        <NumberField source="value" label="Valor" />
        <NumberField source="final_value" label="Valor final" />
        <TextField source="payment_type" label="Tipo de pagamento" />
        <TextField source="payment_status" label="Status do pagamento" />
        <TextField source="sales_type" label="Tipo de compra" />
        <TextField source="delivery_point_id" label="Ponto de entrega" />
        <TextField source="user_id" label="Usuário" />
        <TextField source="list_id" label="Lista" />
      </Datagrid>
    </List>
  )
}
export default OrdersList
