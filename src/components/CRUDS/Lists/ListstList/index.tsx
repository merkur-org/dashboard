import React, { cloneElement, Children, memo } from 'react'
import { useMediaQuery, makeStyles } from '@material-ui/core'
import { Theme } from '@material-ui/core/styles'
import {
  Datagrid,
  List,
  SimpleList,
  NumberField,
  TextField,
  EditButton,
  ShowButton,
  FunctionField,
  BooleanField
} from 'ra-ui-materialui'
import { BulkExportButton, BulkDeleteButton, DateField } from 'react-admin'

import { ListsListActions } from './styles'
import UserField from '../../../UI/UserField'

import formatDate from '../../../../utils/formatDate'
import { translateListStatus } from '../../../../utils/translate/translateListStatus'

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

const ListsList: React.FC = props => {
  const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'))

  return (
    <List
      filter={{ filter: 'type=offer' }}
      bulkActionButtons={<ListsListBulkActions />}
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
