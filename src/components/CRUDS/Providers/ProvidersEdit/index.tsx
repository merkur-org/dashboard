import {
  TextInput,
  SelectInput,
  Edit,
  ListButton,
  Toolbar,
  DateInput,
  CloneButton,
  EditActionsProps,
  required,
  ArrayInput,
  ReferenceInput,
  SimpleFormIterator,
  NumberInput,
  EditProps,
  TitleProps
} from 'react-admin'
import React, { useState } from 'react'

import { Form } from './styles'
import { MdArrowBack } from 'react-icons/md'

import formatDate from '../../../../utils/formatDate'
import ActionToolbar from '../../../Dashboard/ActionToolBar'
import CrudTitle from '../../../Dashboard/CrudTitlte'

const ProvidersEdit: React.FC<EditProps> = props => {
  return (
    <Edit
      {...props}
      title={
        <CrudTitle
          contentWithRecord={record => {
            return `Editar fornecedor ${record.name}`
          }}
        />
      }
      actions={
        <ActionToolbar>
          <ListButton label="voltar" icon={<MdArrowBack />} />
        </ActionToolbar>
      }
      mutationMode="pessimistic"
    >
      <Form>
        <TextInput source="name" label="Nome" validate={[required()]} />
        <TextInput source="email" label="Email" validate={[required()]} />
        <TextInput source="phone" label="Telefone" validate={[required()]} />
        <TextInput source="cnpj" label="CNPJ" validate={[required()]} />
      </Form>
    </Edit>
  )
}

export default ProvidersEdit
