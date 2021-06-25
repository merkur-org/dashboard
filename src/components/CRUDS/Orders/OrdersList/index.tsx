import React, { useEffect, useState, Children, cloneElement, memo } from 'react'
import {
  Datagrid,
  DateField,
  List,
  NumberField,
  FunctionField,
  TextField,
  TextFieldProps,
  SimpleList
} from 'ra-ui-materialui'
import { useMediaQuery } from '@material-ui/core'
import { Theme } from '@material-ui/core/styles'
import {
  ArrayField,
  BulkExportButton,
  EditButton,
  ShowButton
} from 'react-admin'
import { useRecordContext } from 'ra-core'
import Cookie from 'js-cookie'

import api from '../../../../services/api'
import { IUserDTO } from '../../../../dtos/IUserDTO'

import serializeDeliveryPoint from '../../../../utils/serializeDeliveryPoint'
import {
  translatePaymentStatus,
  translatePaymentType,
  translateSalesType
} from '../../../../utils/translate'

import { OrdersListActions } from './styles'

export const UserField: React.FC<TextFieldProps> = props => {
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

const OrdersListActionToolbar = ({ children, ...props }) => {
  return (
    <OrdersListActions>
      {Children.map(children, button => cloneElement(button, props))}
    </OrdersListActions>
  )
}

const OrdersListBulkActions = memo(({ children, ...props }) => (
  <div>
    <BulkExportButton {...props} />
  </div>
))

const OrderExpandPanel = ({ record }) => {
  console.log(record.record.details)

  return (
    <div>
      <DeliveryPointField label="Ponto de entrega" />
      <ArrayField source={record.record.details}>
        <Datagrid>
          <TextField label="Id" source="discount" />
        </Datagrid>
      </ArrayField>
    </div>
  )
}

const OrdersList: React.FC = props => {
  const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'))

  return (
    <List {...props} bulkActionButtons={<OrdersListBulkActions />}>
      {isSmall ? (
        <SimpleList
          primaryText={record => <DateField source="date" record={record} />}
          secondaryText={record => (
            <UserField source="user_id" record={record} />
          )}
          tertiaryText={record => (
            <FunctionField
              source="final_value"
              record={record}
              render={record => (
                <strong>R$ {record.final_value.toFixed(2)} </strong>
              )}
            />
          )}
        />
      ) : (
        <Datagrid expand={record => <OrderExpandPanel record={record} />}>
          <DateField source="date" label="Data do pedido" sortable={false} />
          <UserField source="user_id" label="Usuário" sortable={false} />
          <FunctionField
            source="payment_type"
            label="Tipo de pagamento"
            render={record => translatePaymentType(record.payment_type)}
            sortable={false}
          />
          <FunctionField
            source="payment_status"
            label="Status do pagamento"
            render={record => translatePaymentStatus(record.payment_status)}
            sortable={false}
          />
          <FunctionField
            source="sales_type"
            label="Tipo de compra"
            render={record => translateSalesType(record.sales_type)}
            sortable={false}
          />
          <FunctionField
            source="value"
            label="Valor"
            render={record => <strong>R$ {record.value.toFixed(2)}</strong>}
            sortable={false}
          />
          <FunctionField
            source="final_value"
            label="Valor final"
            render={record => (
              <strong>R$ {record.final_value.toFixed(2)} </strong>
            )}
            sortable={false}
          />
          <OrdersListActionToolbar>
            <ShowButton />
          </OrdersListActionToolbar>
        </Datagrid>
      )}
    </List>
  )
}
export default OrdersList
