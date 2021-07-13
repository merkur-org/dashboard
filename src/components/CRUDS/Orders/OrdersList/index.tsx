import React, { memo } from 'react'
import {
  Datagrid,
  DateField,
  List,
  NumberField,
  FunctionField,
  TextField,
  TextInput,
  DateInput
} from 'ra-ui-materialui'
import { useMediaQuery } from '@material-ui/core'
import { Theme } from '@material-ui/core/styles'
import { ArrayField, BulkExportButton, Filter } from 'react-admin'

import UserField from '../../../UI/UserField'
import DeliveryPointField from '../../../UI/DeliveryPointField'
import ProductsField from '../../../UI/ProductsField'

import { translatePaymentType } from '../../../../utils/translate/translatePaymentType'
import { translatePaymentStatus } from '../../../../utils/translate/translatePaymentStatus'
import { translateSalesType } from '../../../../utils/translate/translateSalesType'

import { DetailsContainer, Detail } from './styles'

const OrdersListBulkActions = memo(({ children, ...props }) => (
  <div>
    <BulkExportButton {...props} />
  </div>
))

const OrderExpandPanel = ({ isSmall, ...props }) => {
  const { record } = props

  return (
    <>
      <DeliveryPointField label="Ponto de entrega" />
      {isSmall && (
        <DetailsContainer>
          <Detail>
            <h3>Tipo de pagamento</h3>
            <p>{translatePaymentType(record.payment_type)}</p>
          </Detail>
          <Detail>
            <h3>Status do pagamento</h3>
            <p>{translatePaymentStatus(record.payment_status)}</p>
          </Detail>
          <Detail>
            <h3>Tipo de venda</h3>
            <p>{translateSalesType(record.sales_type)}</p>
          </Detail>
          <Detail>
            <h3>Valor</h3>
            <p>{record.value.toFixed(2)}</p>
          </Detail>
          <Detail>
            <h3>Valor Final</h3>
            <p>{record.final_value.toFixed(2)}</p>
          </Detail>
        </DetailsContainer>
      )}
      <ArrayField source="details">
        <Datagrid>
          <FunctionField
            label="Produtos"
            source="product_id"
            render={() => <ProductsField />}
          />
          <NumberField label="Quantidade" source="quantity" />
          <NumberField label="Preço unitário" source="unit_price" />
          <TextField label="Desconto" source="discount" />
          <FunctionField
            label="Total"
            render={record =>
              `${record.quantity * record.unit_price * (1 - record.discount)}`
            }
          />
        </Datagrid>
      </ArrayField>
    </>
  )
}

const OrdersFilter = props => {
  return (
    <Filter {...props}>
      <DateInput label="Procurar" source="date" alwaysOn placeholder="" />
    </Filter>
  )
}

const OrdersList: React.FC = props => {
  const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'))

  return (
    <List
      filters={<OrdersFilter />}
      bulkActionButtons={<OrdersListBulkActions />}
      {...props}
    >
      <Datagrid expand={<OrderExpandPanel isSmall={isSmall} />}>
        <DateField source="date" label="Data do pedido" sortable={false} />
        <UserField source="user_id" label="Usuário" sortable={false} />
        {!isSmall && (
          <FunctionField
            source="payment_type"
            label="Tipo de pagamento"
            render={record => translatePaymentType(record.payment_type)}
            sortable={false}
          />
        )}
        {!isSmall && (
          <FunctionField
            source="payment_status"
            label="Status do pagamento"
            render={record => translatePaymentStatus(record.payment_status)}
            sortable={false}
          />
        )}
        {!isSmall && (
          <FunctionField
            source="sales_type"
            label="Tipo de compra"
            render={record => translateSalesType(record.sales_type)}
            sortable={false}
          />
        )}
        {!isSmall && (
          <FunctionField
            source="value"
            label="Valor"
            render={record => <strong>R$ {record.value.toFixed(2)}</strong>}
            sortable={false}
          />
        )}
        <FunctionField
          source="final_value"
          label="Valor final"
          render={record => (
            <strong>R$ {record.final_value.toFixed(2)} </strong>
          )}
          sortable={false}
        />
      </Datagrid>
    </List>
  )
}
export default OrdersList
