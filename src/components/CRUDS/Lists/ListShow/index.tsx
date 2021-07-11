import {
  ListButton,
  RichTextField,
  ImageField,
  Show,
  TextField,
  FunctionField,
  NumberField
} from 'ra-ui-materialui'
import React from 'react'
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
  return (
    <Show
      {...props}
      actions={<ProductShowActions />}
      title={<ProductShowTitle />}
    >
      <ShowData>
        <DateField
          source="start_date"
          label="Data de início"
          sortable={false}
        />
        <DateField source="end_date" label="Data de término" sortable={false} />
        <UserField source="user_id" label="Usuário" sortable={false} />
        <FunctionField
          source="type"
          label="Tipo"
          render={record => translateListType(record.type)}
          sortable={false}
        />
        <FunctionField
          source="status"
          label="Status"
          render={record => translateListStatus(record.status)}
          sortable={false}
        />
        <ArrayField source="details">
          <Datagrid>
            <ProductsField label="Produtos" source="product_id" />
            <NumberField label="Quantidade Total" source="quantity_total" />
            <NumberField
              label="Quantidade em estoque"
              source="quantity_stock"
            />
            <NumberField label="Preço unitário" source="unit_price" />
            <NumberField label="Preço unitário" source="unit_price" />
          </Datagrid>
        </ArrayField>
      </ShowData>
    </Show>
  )
}

export default ListShow
