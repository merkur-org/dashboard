import Cookies from 'js-cookie'
import React, { useState, useCallback, useEffect, useContext } from 'react'
import {
  Create,
  TextInput,
  SelectInput,
  ListButton,
  CreateProps,
  Toolbar,
  DateInput,
  ArrayInput,
  SimpleFormIterator,
  ReferenceInput,
  NumberInput,
  FunctionField,
  required,
  ButtonProps,
  Button
} from 'react-admin'
import { MdArrowBack, MdDelete } from 'react-icons/md'

import { Form, BololeanInputsContainer } from './styles'
import handleAddImage from '../../../../utils/handleAddImage'
import { useForm } from 'react-final-form'

const ListCreateActions: React.FC = props => {
  return (
    <Toolbar>
      <ListButton label="voltar" icon={<MdArrowBack />} />
    </Toolbar>
  )
}

interface ClearProductsProps extends ButtonProps {
  state: string
}

export const ClearProducts: React.FC<ClearProductsProps> = ({
  state,
  ...props
}) => {
  const form = useForm()

  const handleClick = useCallback(() => {
    form.change('details', undefined)
  }, [form])

  useEffect(() => {
    handleClick()
  }, [state])

  return (
    <Button
      onClick={handleClick}
      variant="contained"
      label="Limpar itens"
      {...props}
    />
  )
}

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
        actions={<ListCreateActions />}
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
            choices={[
              { id: 'offer', name: 'Oferta' },
              { id: 'producer', name: 'Produtor' }
            ]}
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
                  <DateInput
                    source="due_date"
                    label="Data de vencimento"
                    validate={[required()]}
                  />
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
