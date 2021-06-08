import {
  Datagrid,
  List,
  NumberField,
  TextField,
  EditButton
} from 'ra-ui-materialui'
import * as React from 'react'

const DeliveryPointsList: React.FC = props => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="city" />
        <TextField source="state" />
        <TextField source="suburb" />
        <TextField source="street" />
        <NumberField source="number" />
        <TextField source="cep" />
      </Datagrid>
    </List>
  )
}
export default DeliveryPointsList