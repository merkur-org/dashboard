import {
  TextInput,
  SelectInput,
  Edit,
  ListButton,
  Toolbar,
  DateInput,
  CloneButton,
  EditActionsProps,
  required,
  ArrayInput,
  ReferenceInput,
  SimpleFormIterator,
  NumberInput,
  EditProps
} from 'react-admin'
import React, { useState } from 'react'

import { Form } from './styles'
import { MdArrowBack } from 'react-icons/md'

import { ClearProducts } from '../ListCreate'
import { listTypes } from '../listTypes'
import formatDate from '../../../../utils/formatDate'

const ListEditActions = (props: EditActionsProps) => {
  return (
    <Toolbar>
      <ListButton label="voltar" icon={<MdArrowBack />} />
      <CloneButton record={props.data} basePath={props.basePath} />
    </Toolbar>
  )
}

const ListEditTitle = props => {
  return (
    <span>
      {' '}
      Editar lista de {formatDate(props.record.start_date)} à
      {formatDate(props.record.end_date)}
    </span>
  )
}

const ListEdit: React.FC<EditProps> = props => {
  const [listType, setListType] = useState<string>()

  const handleSetListType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListType(e.target.value)
  }

  return (
    <Edit
      {...props}
      title={<ListEditTitle />}
      actions={<ListEditActions />}
      mutationMode="pessimistic"
    >
      <Form
        validate={values => {
          const errors = {} as any

          if (values['start_date'] && values['end_date']) {
            const start = new Date(values['start_date'])
            const end = new Date(values['end_date'])

            if (start.getTime() > end.getTime()) {
              console.log(start, end)
              errors['start_date'] =
                'O início da oferta deve ocorrer antes da data de fim'
            }
          }

          return errors
        }}
        initialValues={values => {
          setListType(values.type)
        }}
      >
        <DateInput
          source="start_date"
          label="Data de início"
          autoFocus
          validate={[required()]}
        />
        <DateInput
          source="end_date"
          label="Data de início"
          validate={[required()]}
        />
        <SelectInput
          source="type"
          label="Tipo da lista"
          choices={listTypes}
          onChange={handleSetListType}
          validate={[required()]}
        />
        <ClearProducts state={listType} />
        <ArrayInput label="Produtos" source="details" validate={[required()]}>
          <SimpleFormIterator>
            <ReferenceInput
              source="product_id"
              reference="products"
              label="Produto"
            >
              <SelectInput optionText="name" validate={[required()]} />
            </ReferenceInput>
            <NumberInput
              source="unit_price"
              label="Preço unitário"
              placeholder="R$"
              min={0}
              validate={[required()]}
            />
            {listType === 'offer' && (
              <TextInput
                source="sale_price"
                label="Preço de venda"
                placeholder="R$"
                validate={[required()]}
              />
            )}
            {listType === 'offer' && (
              <NumberInput
                source="quantity_total"
                label="Quantidade total"
                min={0}
                validate={[required()]}
              />
            )}
            {listType === 'offer' && (
              <NumberInput
                source="quantity_stock"
                label="Quantidade em estoque"
                min={0}
                validate={[required()]}
              />
            )}
            {listType === 'producer' && (
              <DateInput
                source="due_date"
                label="Data de vencimento"
                validate={[required()]}
              />
            )}
            {listType === 'producer' && (
              <NumberInput
                source="quantity"
                label="Quantidade"
                min={0}
                validate={[required()]}
              />
            )}
            {listType === 'producer' && (
              <NumberInput
                source="discount"
                label="Desconto"
                min={0}
                validate={[required()]}
              />
            )}
            {listType === 'producer' && (
              <NumberInput
                source="total_price"
                label="Preço total"
                validate={[required()]}
              />
            )}
            {listType === 'producer' && (
              <TextInput source="lot" label="Lote" validate={[required()]} />
            )}
          </SimpleFormIterator>
        </ArrayInput>
      </Form>
    </Edit>
  )
}

export default ListEdit
