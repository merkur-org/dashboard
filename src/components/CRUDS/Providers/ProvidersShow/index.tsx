import {
  ListButton,
  RichTextField,
  ImageField,
  Show,
  TextField,
  FunctionField,
  NumberField
} from 'ra-ui-materialui'
import React, { useState } from 'react'
import {
  ArrayField,
  Datagrid,
  DateField,
  ShowActionsProps,
  ShowProps,
  TitleProps,
  Toolbar,
  useRecordContext
} from 'react-admin'
import { MdArrowBack } from 'react-icons/md'
import formatDate from '../../../../utils/formatDate'
import { translateListStatus } from '../../../../utils/translate/translateListStatus'
import { translateListType } from '../../../../utils/translate/translateListType'

import CrudTitle from '../../../Dashboard/CrudTitlte'
import ProductsField from '../../../Dashboard/ProductsField'
import UserField from '../../../Dashboard/UserField'

import { ShowData } from './styles'

const ProvidersShowActions = (props: ShowActionsProps) => {
  return (
    <Toolbar>
      <ListButton label="voltar" icon={<MdArrowBack />} />
    </Toolbar>
  )
}

const ProvidersShow: React.FC<ShowProps> = props => {
  return (
    <Show
      actions={<ProvidersShowActions />}
      title={
        <CrudTitle
          contentWithRecord={(record:any) => {
            return record.name
          }}
        />
      }
      {...props}
    >
      <ShowData>
        <TextField source="name" label="Nome" />
        <TextField source="phone" label="Telefone" />
        <TextField source="email" label="Email" />
        <TextField source="cnpj" label="CNPJ" />
      </ShowData>
    </Show>
  )
}

export default ProvidersShow
