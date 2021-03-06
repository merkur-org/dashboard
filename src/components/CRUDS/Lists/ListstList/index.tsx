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
import ActionToolBar from '../../../Dashboard/ActionToolBar'
import BulkActionButtons from '../../../Dashboard/BulkActionButtons'

import formatDate from '../../../../utils/formatDate'
import { translateListStatus } from '../../../../utils/translate/translateListStatus'
import { translateListType } from '../../../../utils/translate/translateListType'
import { useState } from 'react'
import { listTypes } from '../listTypes'

const ListsFilter = (props: any) => {
  return (
    <Filter {...props}>
      <RadioButtonGroupInput
        source="type"
        alwaysOn
        label=""
        choices={listTypes}
        onChange={e => {
          props?.setListType({ type: e })
        }}
      />
    </Filter>
  )
}

const ListsList: React.FC<ListProps> = props => {
  const [listType, setListType] = useState({ type: 'offer' })
  const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'))

  return (
    <List
      bulkActionButtons={
        <BulkActionButtons>
          <BulkDeleteButton />
          <BulkExportButton />
        </BulkActionButtons>
      }
      filter={listType}
      filters={<ListsFilter setListType={setListType} />}
      {...props}
    >
      {isSmall ? (
        <SimpleList
          primaryText={(record: any) => formatDate(record.start_date)}
          secondaryText={(record: any) => formatDate(record.end_date)}
          tertiaryText={(record: any) => translateListStatus(record.status)}
        />
      ) : (
        <Datagrid rowClick="edit" optimized>
          <DateField
            source="start_date"
            label="Data de in??cio"
            sortable={false}
          />
          <DateField
            source="end_date"
            label="Data de t??rmino"
            sortable={false}
          />
          <UserField source="user_id" label="Usu??rio" sortable={false} />
          <FunctionField
            source="type"
            label="Tipo"
            render={(record: any) => translateListType(record.type)}
            sortable={false}
          />
          <FunctionField
            source="status"
            label="Status"
            render={(record: any) => translateListStatus(record.status)}
            sortable={false}
          />
          <FunctionField
            source="producer"
            label="Fornecedor"
            render={(record: any) => record.producer.name}
          />
          <ActionToolBar>
            <EditButton label="Editar Lista" />
            <ShowButton label="Ver detalhes" />
          </ActionToolBar>
        </Datagrid>
      )}
    </List>
  )
}
export default ListsList
