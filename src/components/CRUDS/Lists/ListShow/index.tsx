import {
  ListButton,
  RichTextField,
  ImageField,
  Show,
  TextField,
  FunctionField,
  NumberField
} from 'ra-ui-materialui'
import React, { useState } from 'react'
import {
  ArrayField,
  Datagrid,
  DateField,
  ShowActionsProps,
  TitleProps,
  Toolbar
} from 'react-admin'
import { MdArrowBack } from 'react-icons/md'
import formatDate from '../../../../utils/formatDate'
import { translateListStatus } from '../../../../utils/translate/translateListStatus'
import { translateListType } from '../../../../utils/translate/translateListType'
import ProductsField from '../../../UI/ProductsField'
import UserField from '../../../UI/UserField'

import { ShowData } from './styles'

const ProductShowActions = (props: ShowActionsProps) => {
  return (
    <Toolbar>
      <ListButton label="voltar" icon={<MdArrowBack />} />
    </Toolbar>
  )
}

const ProductShowTitle = ({ record }: TitleProps) => {
  return (
    <span>
      Lista de {formatDate(record.start_date)} à {formatDate(record.end_date)}
    </span>
  )
}

const ListShow: React.FC = props => {
  const [listType, setListType] = useState<string>()

  return (
    <Show
      {...props}
      actions={<ProductShowActions />}
      title={<ProductShowTitle />}
    >
      <>
        <ShowData>
          <DateField
            source="start_date"
            label="Data de início"
            sortable={false}
          />
          <DateField
            source="end_date"
            label="Data de término"
            sortable={false}
          />
          <FunctionField
            source="type"
            label="Tipo"
            render={record => {
              setListType(record.type)
              return translateListType(record.type)
            }}
            sortable={false}
          />
          <FunctionField
            source="status"
            label="Status"
            render={record => translateListStatus(record.status)}
            sortable={false}
          />
        </ShowData>
        <ArrayField source="details">
          <Datagrid>
            <ProductsField
              source="product_id"
              label="Produto"
              sortable={false}
            />
            <DateField
              source="due_date"
              label="Data de vencimento"
              sortable={false}
            />
            <NumberField
              source="unit_price"
              label="Preço unitário"
              sortable={false}
            />
            {listType === 'offer' && (
              <TextField
                source="sale_price"
                label="Preço de venda"
                placeholder="R$"
                sortable={false}
              />
            )}
            {listType === 'offer' && (
              <NumberField
                source="quantity_total"
                label="Quantidade total"
                sortable={false}
              />
            )}
            {listType === 'offer' && (
              <NumberField
                source="quantity_stock"
                label="Quantidade em estoque"
                sortable={false}
              />
            )}
            {listType === 'producer' && (
              <NumberField
                source="quantity"
                label="Quantidade"
                sortable={false}
              />
            )}
            {listType === 'producer' && (
              <NumberField
                source="discount"
                label="Desconto"
                sortable={false}
              />
            )}
            {listType === 'producer' && (
              <NumberField
                source="total_price"
                label="Preço total"
                sortable={false}
              />
            )}
            {listType === 'producer' && (
              <TextField source="lot" label="Lote" sortable={false} />
            )}
          </Datagrid>
        </ArrayField>
      </>
    </Show>
  )
}

export default ListShow
