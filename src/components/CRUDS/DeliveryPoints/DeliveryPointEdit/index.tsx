import {
  TextInput,
  SelectInput,
  Edit,
  ListButton,
  Toolbar,
  TitleProps,
  useTranslate,
  TabbedForm,
  FormTab,
  ImageInput,
  ImageField,
  BooleanInput,
  CloneButton,
  EditActionsProps,
  useRefresh,
  useRedirect,
  NumberInput,
  SimpleForm
} from 'react-admin'
import React, { useState, useEffect } from 'react'

import { Form } from './styles'

import BackButton from '../../../UI/BackButton'
import { MdArrowBack } from 'react-icons/md'
import handleAddImage from '../../../../utils/handleAddImage'
import axios from 'axios'

const DeliveryPointEditActions = (props: EditActionsProps) => {
  return (
    <Toolbar>
      <ListButton label="voltar" icon={<MdArrowBack />} />
      <CloneButton record={props.data} basePath={props.basePath} />
    </Toolbar>
  )
}

const DeliveryPointEditTitle = ({ record }: TitleProps) => {
  return <span> Editar produto {record.name}</span>
}

interface UFProps {
  id: string
  name: string
}

const DeliveryPointEdit: React.FC = props => {
  const [ufs, setUfs] = useState<UFProps[]>()

  useEffect(() => {
    async function fetchUfs() {
      const { data } = await axios.get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
      )

      console.log(data)

      const states = data.map(uf => {
        return {
          id: uf.sigla,
          name: uf.sigla
        }
      })

      setUfs(states)
    }
    fetchUfs()
  }, [])

  return (
    <Edit
      {...props}
      title={<DeliveryPointEditTitle />}
      actions={<DeliveryPointEditActions />}
      mutationMode="pessimistic"
    >
      <Form>
        <TextInput source="city" label="Cidade" autoFocus />
        <SelectInput source="state" label="Estado" choices={ufs} />
        <TextInput source="suburb" label="Bairro" />
        <TextInput source="street" label="Rua" />
        <NumberInput source="number" label="Número" min={1} />
        <TextInput source="cep" label="CEP" />
      </Form>
    </Edit>
  )
}

export default DeliveryPointEdit
