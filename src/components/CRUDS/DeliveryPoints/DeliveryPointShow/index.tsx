import { ListButton, Show, TextField } from 'ra-ui-materialui'
import React from 'react'
import { NumberField, ShowProps, Toolbar } from 'react-admin'
import { MdArrowBack } from 'react-icons/md'
import CrudTitle from '../../../Dashboard/CrudTitlte'

import { ShowData } from './styles'

const DeliveryPointShowActions = () => {
  return (
    <Toolbar>
      <ListButton label="voltar" icon={<MdArrowBack />} />
    </Toolbar>
  )
}

const DeliveryPointShow: React.FC<ShowProps> = props => {
  return (
    <Show
      {...props}
      actions={<DeliveryPointShowActions />}
      title={
        <CrudTitle
          contentWithRecord={(record: any) => {
            return 'Ponto de entrega'
          }}
        />
      }
    >
      <ShowData>
        <TextField source="city" label="Cidade" />
        <TextField source="state" label="Estado" />
        <TextField source="suburb" label="Bairro" />
        <TextField source="street" label="Rua" />
        <NumberField source="number" label="Número" />
        <TextField source="cep" label="CEP" />
      </ShowData>
    </Show>
  )
}

export default DeliveryPointShow
