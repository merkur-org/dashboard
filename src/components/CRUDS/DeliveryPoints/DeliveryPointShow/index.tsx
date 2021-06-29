import { ListButton, Show, TextField } from 'ra-ui-materialui'
import React from 'react'
import { NumberField, Toolbar } from 'react-admin'
import { MdArrowBack } from 'react-icons/md'

import { ShowData } from './styles'

const DeliveryPointShowActions = () => {
  return (
    <Toolbar>
      <ListButton label="voltar" icon={<MdArrowBack />} />
    </Toolbar>
  )
}

const DeliveryPointShowTitle = () => {
  return <span>Ponto de entrega</span>
}

const DeliveryPointShow: React.FC = props => {
  return (
    <Show
      {...props}
      actions={<DeliveryPointShowActions />}
      title={<DeliveryPointShowTitle />}
    >
      <ShowData>
        <TextField source="city" label="Cidade" />
        <TextField source="state" label="Estado" />
        <TextField source="suburb" label="Bairro" />
        <TextField source="street" label="Rua" />
        <NumberField source="number" label="Número" />
      </ShowData>
    </Show>
  )
}

export default DeliveryPointShow
