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
// in PostList.js
import { downloadCSV, Exporter } from 'react-admin'
import jsonExport from 'jsonexport/dist'
import { useMediaQuery } from '@material-ui/core'
import { Theme } from '@material-ui/core/styles'
import { ArrayField, BulkExportButton, Filter, ListProps } from 'react-admin'

import UserField from '../../../Dashboard/UserField'
import DeliveryPointField from '../../../Dashboard/DeliveryPointField'
import ProductsField from '../../../Dashboard/ProductsField'
import BulkActionButtons from '../../../Dashboard/BulkActionButtons'

import { translatePaymentType } from '../../../../utils/translate/translatePaymentType'
import { translatePaymentStatus } from '../../../../utils/translate/translatePaymentStatus'
import { translateSalesType } from '../../../../utils/translate/translateSalesType'
import formatDate from '../../../../utils/formatDate'

import { DetailsContainer, Detail } from './styles'
import serializeDeliveryPoint from '../../../../utils/serializeDeliveryPoint'

const OrderExpandPanel = ({ isSmall, ...props }: any) => {
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
            render={(record: any) =>
              `${record.quantity * record.unit_price * (1 - record.discount)}`
            }
          />
        </Datagrid>
      </ArrayField>
    </>
  )
}

const OrdersFilter = (props: any) => {
  return (
    <Filter {...props}>
      <DateInput label="Procurar" source="date" alwaysOn placeholder="" />
    </Filter>
  )
}

const exportOrders: Exporter = async (
  records,
  fetchRelatedRecords,
  dataProvider
) => {
  Promise.all(
    records.map(async record => {
      const {
        payment_status,
        id,
        delivery_point_id,
        created_at,
        details,
        updated_at,
        list_id,
        user_id,
        ...ordersForExport
      } = record

      ordersForExport.delivery_point = await serializeDeliveryPoint(
        delivery_point_id
      )

      ordersForExport.payment_type = translatePaymentType(
        ordersForExport.payment_type
      )

      ordersForExport.sales_type = translateSalesType(
        ordersForExport.sales_type
      )

      ordersForExport.date = formatDate(ordersForExport.date)

      const user = await dataProvider.getOne('users', { id: user_id })
      ordersForExport.user = user.data.name

      Promise.all(
        details.map(async details => {
          const {
            created_at,
            updated_at,
            id,
            order_id,
            product_id,
            ...detailsToExport
          } = details

          const product = await dataProvider.getOne('products', {
            id: product_id
          })

          detailsToExport.user = user.data.name

          detailsToExport.product = product.data.name
          return detailsToExport
        })
      ).then(res => {
        jsonExport(
          res,
          {
            headers: ['product', 'quantity', 'discount', 'unit_price'],
            rename: ['Produto', 'Quantidade', 'Desconto', 'Preço unitário']
          },
          (err, csv) => {
            downloadCSV(csv, 'Detalhes do pedido')
          }
        )
      })
      return ordersForExport
    })
  ).then(res => {
    jsonExport(
      res,
      {
        headers: [
          'user',
          'delivery_point',
          'date',
          'payment_type',
          'sales_type',
          'value',
          'final_value'
        ],
        rename: [
          'Cliente',
          'Ponto de entrega',
          'Data do pedido',
          'Tipo de pagamento',
          'Tipo de compra',
          'Valor',
          'Valor final'
        ]
      },
      (err, csv) => {
        downloadCSV(csv, 'Pedidos')
      }
    )
  })
}

const OrdersList: React.FC<ListProps> = props => {
  const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'))

  return (
    <List
      filters={<OrdersFilter />}
      bulkActionButtons={
        <BulkActionButtons>
          <BulkExportButton />
        </BulkActionButtons>
      }
      exporter={exportOrders}
      {...props}
    >
      <Datagrid expand={<OrderExpandPanel isSmall={isSmall} />}>
        <DateField source="date" label="Data do pedido" sortable={false} />
        <UserField source="user_id" label="Usuário" sortable={false} />
        {!isSmall && (
          <FunctionField
            source="payment_type"
            label="Tipo de pagamento"
            render={(record: any) => translatePaymentType(record.payment_type)}
            sortable={false}
          />
        )}
        {!isSmall && (
          <FunctionField
            source="payment_status"
            label="Status do pagamento"
            render={(record: any) =>
              translatePaymentStatus(record.payment_status)
            }
            sortable={false}
          />
        )}
        {!isSmall && (
          <FunctionField
            source="sales_type"
            label="Tipo de compra"
            render={(record: any) => translateSalesType(record.sales_type)}
            sortable={false}
          />
        )}
        {!isSmall && (
          <FunctionField
            source="value"
            label="Valor"
            render={(record: any) => (
              <strong>R$ {record.value.toFixed(2)}</strong>
            )}
            sortable={false}
          />
        )}
        <FunctionField
          source="final_value"
          label="Valor final"
          render={(record: any) => (
            <strong>R$ {record.final_value.toFixed(2)} </strong>
          )}
          sortable={false}
        />
      </Datagrid>
    </List>
  )
}
export default OrdersList
