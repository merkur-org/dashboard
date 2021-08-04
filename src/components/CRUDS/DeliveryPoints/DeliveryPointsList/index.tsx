import React, { cloneElement, memo, Children } from 'react'
import { ListProps } from 'react-admin'
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

import ActionToolBar from '../../../Dashboard/ActionToolBar'
import BulkActionButtons from '../../../Dashboard/BulkActionButtons'

const DeliveryPointsList: React.FC<ListProps> = props => {
  const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'))

  return (
    <List
      {...props}
      bulkActionButtons={
        <BulkActionButtons>
          <BulkDeleteButton />
          <BulkExportButton />
        </BulkActionButtons>
      }
    >
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
          <ActionToolBar>
            <EditButton />
            <ShowButton />
          </ActionToolBar>
        </Datagrid>
      )}
    </List>
  )
}
export default DeliveryPointsList
