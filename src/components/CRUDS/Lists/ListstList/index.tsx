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
  RadioButtonGroupInput
} from 'react-admin'

import { ListsListActions, Card } from './styles'
import UserField from '../../../UI/UserField'

import formatDate from '../../../../utils/formatDate'
import { translateListStatus } from '../../../../utils/translate/translateListStatus'
import { translateListType } from '../../../../utils/translate/translateListType'
import { useState } from 'react'
import { listTypes } from '../listTypes'

const ListsListActionToolbar = ({ children, ...props }) => {
  return (
    <ListsListActions>
      {Children.map(children, button => cloneElement(button, props))}
    </ListsListActions>
  )
}

const ListsListBulkActions = memo(({ children, ...props }) => (
  <div>
    <BulkDeleteButton {...props} />
    <BulkExportButton {...props} />
  </div>
))

const ListsFilter = props => {
  return (
    <Filter {...props}>
      <RadioButtonGroupInput
        source="type"
        alwaysOn
        label=""
        choices={listTypes}
        onChange={e => {
          props.setListType({ type: e })
        }}
      />
    </Filter>
  )
}

const ListsList: React.FC = props => {
  const [listType, setListType] = useState({ type: 'offer' })
  const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'))

  return (
    <List
      bulkActionButtons={<ListsListBulkActions />}
      filter={listType}
      filters={<ListsFilter setListType={setListType} />}
      {...props}
    >
      {isSmall ? (
        <SimpleList
          primaryText={record => formatDate(record.start_date)}
          secondaryText={record => formatDate(record.end_date)}
          tertiaryText={record => translateListStatus(record.status)}
        />
      ) : (
        <Datagrid rowClick="edit" optimized>
          <DateField
            source="start_date"
            label="Data de início"
            sortable={false}
          />
          <DateField
            source="end_date"
            label="Data de término"
            sortable={false}
          />
          <UserField source="user_id" label="Usuário" sortable={false} />
          <FunctionField
            source="type"
            label="Tipo"
            render={record => translateListType(record.type)}
            sortable={false}
          />
          <FunctionField
            source="status"
            label="Status"
            render={record => translateListStatus(record.status)}
            sortable={false}
          />
          <ListsListActionToolbar>
            <EditButton label="Editar Lista" />
            <ShowButton label="Ver detalhes" />
          </ListsListActionToolbar>
        </Datagrid>
      )}
    </List>
  )
}
export default ListsList
