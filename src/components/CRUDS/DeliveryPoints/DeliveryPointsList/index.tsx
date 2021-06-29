import React, { cloneElement, memo, Children } from 'react'
import { Theme, useMediaQuery } from '@material-ui/core'
import {
  Datagrid,
  List,
  NumberField,
  TextField,
  EditButton,
  BulkDeleteButton,
  BulkExportButton,
  ShowButton,
  SimpleList
} from 'ra-ui-materialui'

import { DeliveryPointsListActions } from './styles'

const DeliveryPointsActionToolbar = ({ children, ...props }) => {
  return (
    <DeliveryPointsListActions>
      {Children.map(children, button => cloneElement(button, props))}
    </DeliveryPointsListActions>
  )
}

const DeliveryPointsListBulkActions = memo(({ children, ...props }) => (
  <div>
    <BulkDeleteButton {...props} />
    <BulkExportButton {...props} />
  </div>
))

const DeliveryPointsList: React.FC = props => {
  const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'))

  return (
    <List {...props} bulkActionButtons={<DeliveryPointsListBulkActions />}>
      {isSmall ? (
        <SimpleList
          primaryText={record => record.city}
          secondaryText={record => record.state}
          tertiaryText={record => record.cep}
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField
            source="city"
            label="Cidade"
            sortBy="city.city"
            sortable={false}
          />
          <TextField source="state" label="Estado" sortable={false} />
          <TextField source="suburb" label="Bairro" sortable={false} />
          <TextField source="street" label="Rua" sortable={false} />
          <NumberField source="number" label="Número" sortable={false} />
          <TextField source="cep" label="CEP" sortable={false} />
          <DeliveryPointsActionToolbar>
            <EditButton />
            <ShowButton />
          </DeliveryPointsActionToolbar>
        </Datagrid>
      )}
    </List>
  )
}
export default DeliveryPointsList
