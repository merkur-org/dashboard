import {
  Datagrid,
  DateField,
  List,
  NumberField,
  FunctionField,
  TextField,
  TextFieldProps
} from 'ra-ui-materialui'
import { useRecordContext } from 'ra-core'
import React, { useEffect, useState } from 'react'
import serializeDeliveryPoint from '../../../../utils/serializeDeliveryPoint'
import api from '../../../../services/api'
import { IUserDTO } from '../../../../dtos/IUserDTO'
import Cookie from 'js-cookie'

const DeliveryPointField: React.FC<TextFieldProps> = props => {
  const record = useRecordContext(props)
  const [deliveryPoint, setDeliveryPoint] = useState('')

  useEffect(() => {
    async function setSerializedDeliveryPoint() {
      const point = await serializeDeliveryPoint(record.delivery_point_id)
      setDeliveryPoint(point)
    }

    setSerializedDeliveryPoint()
  }, [record])

  return <p>{deliveryPoint}</p>
}

const UserField: React.FC<TextFieldProps> = props => {
  const record = useRecordContext(props)
  const [user, setUser] = useState('')

  useEffect(() => {
    async function getUser() {
      const token = Cookie.get('token')

      const { data } = await api.get<IUserDTO>(`/users/${record.user_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setUser(data.name)
    }

    getUser()
  }, [record])

  return <p>{user}</p>
}

const OrdersList: React.FC = props => {
  return (
    <List {...props}>
      <Datagrid>
        <DateField source="date" label="Data do pedido" />
        <FunctionField
          source="value"
          label="Valor"
          render={record => `R$${record.value}`}
        />
        <FunctionField
          source="final_value"
          label="Valor final"
          render={record => `R$${record.final_value}`}
        />
        <TextField source="payment_type" label="Tipo de pagamento" />
        <TextField source="payment_status" label="Status do pagamento" />
        <TextField source="sales_type" label="Tipo de compra" />
        <DeliveryPointField source="delivery_point" label="Ponto de entrega" />
        <UserField source="user_id" label="Usuário" />
        <TextField source="list_id" label="Lista" />
      </Datagrid>
    </List>
  )
}
export default OrdersList
