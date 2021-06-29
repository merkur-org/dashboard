import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useState, useCallback, useEffect, useContext } from 'react'
import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  ImageInput,
  ListButton,
  ImageField,
  FileInput,
  FileField,
  CreateProps,
  Toolbar,
  useNotify,
  useRedirect,
  BooleanInput,
  useRefresh,
  NumberInput
} from 'react-admin'
import { MdArrowBack } from 'react-icons/md'

import handleAddImage from '../../../../utils/handleAddImage'

import { Form } from './styles'

const DeliveryPointCreateActions: React.FC = () => {
  return (
    <Toolbar>
      <ListButton label="voltar" icon={<MdArrowBack />} />
    </Toolbar>
  )
}

interface UFProps {
  id: string
  name: string
}

const DeliveryPointCreate: React.FC<CreateProps> = props => {
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
    <>
      <Create
        {...props}
        title="Adicionar novo ponto de entrega"
        actions={<DeliveryPointCreateActions />}
      >
        <Form
          validate={values => {
            const errors = {} as any
            ;['city', 'state', 'suburb', 'street', 'number', 'cep'].forEach(
              field => {
                if (!values[field]) {
                  errors[field] = 'Campo Obrigatório'
                }
              }
            )

            return errors
          }}
        >
          <TextInput source="city" label="Cidade" autoFocus required />
          <SelectInput source="state" label="Estado" choices={ufs} required />
          <TextInput source="suburb" label="Bairro" required />
          <TextInput source="street" label="Rua" required />
          <NumberInput source="number" label="Número" required />
        </Form>
      </Create>
    </>
  )
}

export default DeliveryPointCreate
