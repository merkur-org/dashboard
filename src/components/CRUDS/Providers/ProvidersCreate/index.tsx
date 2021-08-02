import React, { useState, useCallback, useEffect } from 'react'
import {
  Create,
  TextInput,
  SelectInput,
  ListButton,
  CreateProps,
  Toolbar,
  DateInput,
  ArrayInput,
  SimpleFormIterator,
  ReferenceInput,
  NumberInput,
  required,
  ButtonProps,
  Button
} from 'react-admin'
import { MdArrowBack } from 'react-icons/md'

import ActionToolbar from '../../../Dashboard/ActionToolBar'

import { Form } from './styles'
import { useForm } from 'react-final-form'
import phoneInputMask from '../../../../utils/phoneInputMask'

const ProvidersCreate: React.FC<CreateProps> = props => {
  return (
    <>
      <Create
        {...props}
        title="Adicionar fornecedor"
        actions={
          <ActionToolbar>
            <ListButton label="voltar" icon={<MdArrowBack />} />
          </ActionToolbar>
        }
      >
        <Form
          validate={() => {
            const errors = {} as any

            return errors
          }}
        >
          <TextInput source="name" label="Nome" validate={[required()]} />
          <TextInput source="email" label="Email" validate={[required()]} />
          <TextInput source="phone" label="Telefone" validate={[required()]} />
          <TextInput source="cnpj" label="CNPJ" validate={[required()]} />
        </Form>
      </Create>
    </>
  )
}

export default ProvidersCreate
