import React, { cloneElement, Children, memo } from 'react'
import { useMediaQuery, Chip, CardContent } from '@material-ui/core'
import { Theme } from '@material-ui/core/styles'
import {
  Datagrid,
  List,
  SimpleList,
  EditButton,
  ShowButton,
  FunctionField,
  ChipField,
  FilterList,
  FilterListItem
} from 'ra-ui-materialui'
import {
  BulkExportButton,
  BulkDeleteButton,
  DateField,
  TextInput,
  Filter,
  TextField,
  BooleanInput,
  SimpleForm,
  SelectInput,
  RadioButtonGroupInput,
  ListProps
} from 'react-admin'

import UserField from '../../../Dashboard/UserField'

import formatDate from '../../../../utils/formatDate'
import { translateListStatus } from '../../../../utils/translate/translateListStatus'

import ActionToolBar from '../../../Dashboard/ActionToolBar'
import BulkActionButtons from '../../../Dashboard/BulkActionButtons'

const ProvidersList: React.FC<ListProps> = props => {
  const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'))

  return (
    <List
      bulkActionButtons={
        <BulkActionButtons>
          <BulkDeleteButton />
          <BulkExportButton />
        </BulkActionButtons>
      }
      filter={{ role: 'p' }}
      {...props}
    >
      {isSmall ? (
        <SimpleList
          primaryText={(record:any) => record.name}
          secondaryText={(record:any) => record.phone}
          tertiaryText={(record:any) => record.cnpj}
        />
      ) : (
        <Datagrid rowClick="edit" optimized>
          <TextField source="name" label="Nome" />
          <TextField source="phone" label="Telefone" />
          <TextField source="email" label="Email" />
          <TextField source="cnpj" label="CNPJ" />
          <ActionToolBar>
            <EditButton />
            <ShowButton />
          </ActionToolBar>
        </Datagrid>
      )}
    </List>
  )
}
export default ProvidersList
