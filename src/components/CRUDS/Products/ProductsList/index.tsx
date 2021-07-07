import React, { cloneElement, Children, memo } from 'react'
import { useMediaQuery } from '@material-ui/core'
import { Theme } from '@material-ui/core/styles'
import {
  Datagrid,
  List,
  SimpleList,
  NumberField,
  TextField,
  EditButton,
  ShowButton,
  FunctionField,
  BooleanField
} from 'ra-ui-materialui'
import { BulkExportButton, BulkDeleteButton } from 'react-admin'

import { ProductListActions } from './styles'

const ProductsListActionToolbar = ({ children, ...props }) => {
  return (
    <ProductListActions>
      {Children.map(children, button => cloneElement(button, props))}
    </ProductListActions>
  )
}

const ProductsListBulkActions = memo(({ children, ...props }) => (
  <div>
    <BulkDeleteButton {...props} />
    <BulkExportButton {...props} />
  </div>
))

const ProductsList: React.FC = props => {
  const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'))

  return (
    <List {...props} bulkActionButtons={<ProductsListBulkActions />}>
      {isSmall ? (
        <SimpleList
          primaryText={record => record.name}
          tertiaryText={record => record.category}
        />
      ) : (
        <Datagrid rowClick="edit" optimized>
          <TextField
            source="name"
            label="Nome"
            sortBy="name.name"
            sortable={false}
          />
          <TextField source="category" sortable={false} />
          <TextField
            source="unit_buy"
            label="Unidade de compra"
            sortable={false}
          />
          <TextField
            source="unit_sale"
            label="Unidade de venda"
            sortable={false}
          />
          <NumberField
            source="fraction_buy"
            label="Fração de compra"
            sortable={false}
          />
          <NumberField
            source="fraction_sale"
            label="Fração de venda"
            sortable={false}
          />
          <FunctionField
            source="cost_price"
            label="Preço de compra"
            render={record => `R$${record.cost_price.toFixed(2)}`}
            sortable={false}
          />
          <FunctionField
            source="sale_price"
            label="Preço de venda"
            render={record => `R$${record.sale_price.toFixed(2)}`}
            sortable={false}
          />
          <BooleanField source="organic" label="Orgânico" sortable={false} />
          <ProductsListActionToolbar>
            <EditButton />
            <ShowButton />
          </ProductsListActionToolbar>
        </Datagrid>
      )}
    </List>
  )
}
export default ProductsList
