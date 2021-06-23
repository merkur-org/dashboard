import {
  DeleteButton,
  ListButton,
  RichTextField,
  SelectField,
  ImageField,
  Show,
  ShowProps,
  SimpleShowLayout,
  TextField,
  FunctionField,
  DateField
} from 'ra-ui-materialui'
import React, { useState, useEffect } from 'react'
import {
  ShowActionsProps,
  TextFieldProps,
  TitleProps,
  Toolbar,
  useRecordContext
} from 'react-admin'
import { MdArrowBack } from 'react-icons/md'

import { UserField } from '../OrdersList'

import serializeDeliveryPoint from '../../../../utils/serializeDeliveryPoint'
import {
  translatePaymentStatus,
  translatePaymentType,
  translateSalesType
} from '../../../../utils/translate'

import { ShowData } from './styles'

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

const OrderShowActions = (props: ShowActionsProps) => {
  return (
    <Toolbar>
      <ListButton label="voltar" icon={<MdArrowBack />} />
    </Toolbar>
  )
}

const OrderShowTitle = ({ record }: TitleProps) => {
  return <span>{record.id}</span>
}

const OrdersShow: React.FC = props => {
  return (
    <Show {...props} actions={<OrderShowActions />} title={<OrderShowTitle />}>
      <ShowData>
        <DateField source="date" label="Data do pedido" />
        <UserField source="user_id" label="Usuário" />
        <FunctionField
          source="payment_type"
          label="Tipo de pagamento"
          render={record => translatePaymentType(record.payment_type)}
        />
        <FunctionField
          source="payment_status"
          label="Status do pagamento"
          render={record => translatePaymentStatus(record.payment_status)}
        />
        <FunctionField
          source="sales_type"
          label="Tipo de compra"
          render={record => translateSalesType(record.sales_type)}
        />
        <FunctionField
          source="value"
          label="Valor"
          render={record => <strong>R$ {record.value.toFixed(2)}</strong>}
        />
        <FunctionField
          source="final_value"
          label="Valor final"
          render={record => (
            <strong>R$ {record.final_value.toFixed(2)} </strong>
          )}
        />
      </ShowData>
    </Show>
  )
}

export default OrdersShow
