import React, { useState } from 'react'
import {
  Create,
  TextInput,
  SelectInput,
  ListButton,
  CreateProps,
  DateInput,
  ArrayInput,
  SimpleFormIterator,
  ReferenceInput,
  NumberInput,
  required
} from 'react-admin'
import { MdArrowBack } from 'react-icons/md'

import ActionToolbar from '../../../Dashboard/ActionToolBar'
import ClearProducts from '../ClearProducts'

import { Form } from './styles'
import { listTypes } from '../listTypes'

const ListCreate: React.FC<CreateProps> = props => {
  const [listType, setListType] = useState<string>()

  const handleSetListType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListType(e.target.value)
  }

  return (
    <>
      <Create
        {...props}
        title="Adicionar nova oferta"
        actions={
          <ActionToolbar>
            <ListButton label="voltar" icon={<MdArrowBack />} />
          </ActionToolbar>
        }
      >
        <Form
          validate={(values: any) => {
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
          {listType && (
            <>
              <ClearProducts state={listType} />
              <ArrayInput
                label="Produtos"
                source="details"
                validate={[required()]}
              >
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
                    <ReferenceInput
                      source="name"
                      reference="users"
                      filter={{ role: 'p' }}
                      label="Fornecedor"
                    >
                      <SelectInput optionText="name" validate={[required()]} />
                    </ReferenceInput>
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
                    <TextInput
                      source="lot"
                      label="Lote"
                      validate={[required()]}
                    />
                  )}
                </SimpleFormIterator>
              </ArrayInput>
            </>
          )}
        </Form>
      </Create>
    </>
  )
}

export default ListCreate
