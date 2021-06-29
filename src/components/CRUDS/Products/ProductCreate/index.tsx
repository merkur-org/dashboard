import Cookies from 'js-cookie'
import React, { useState, useCallback, useEffect, useContext } from 'react'
import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  ImageInput,
  ListButton,
  ImageField,
  FileInput,
  FileField,
  CreateProps,
  Toolbar,
  useNotify,
  useRedirect,
  BooleanInput,
  useRefresh
} from 'react-admin'
import { MdArrowBack } from 'react-icons/md'

import { categories, units } from '../ProductsSelect'
import { Form, BololeanInputsContainer } from './styles'
import handleAddImage from '../../../../utils/handleAddImage'

const ProductCreateActions: React.FC = props => {
  return (
    <Toolbar>
      <ListButton label="voltar" icon={<MdArrowBack />} />
    </Toolbar>
  )
}

const ProductCreate: React.FC<CreateProps> = props => {
  const refresh = useRefresh()
  const redirect = useRedirect()

  return (
    <>
      <Create
        {...props}
        title="Adicionar novo produto"
        actions={<ProductCreateActions />}
        onSuccess={formData => {
          handleAddImage(formData)
          redirect('/products')
          refresh()
        }}
      >
        <Form
          validate={values => {
            const errors = {} as any
            ;[
              'name',
              'category',
              'unit_buy',
              'unit_sale',
              'cost_price',
              'wholesale_price',
              'sale_price',
              'fraction_buy',
              'fraction_sale',
              'observation',
              'image',
              'nutritional_information'
            ].forEach(field => {
              if (!values[field]) {
                errors[field] = 'Campo Obrigatório'
              }
            })

            return errors
          }}
        >
          <TextInput source="name" label="Nome" autoFocus required />
          <SelectInput
            source="category"
            label="Categoria"
            choices={categories}
            required
          />
          <SelectInput
            source="unit_buy"
            label="Unidade de compra"
            choices={units}
            required
          />
          <SelectInput
            source="unit_sale"
            label="Unidade de venda"
            choices={units}
            required
          />
          <TextInput
            source="cost_price"
            label="Preço de custo"
            placeholder="R$ 00,"
            required
          />
          <TextInput
            source="wholesale_price"
            label="Preço de atacado"
            placeholder="R$ 00,00"
            required
          />
          <TextInput
            source="sale_price"
            label="Preço de venda"
            placeholder="R$ 00,00"
            required
          />
          <TextInput source="fraction_buy" label="Fração de compra" required />
          <TextInput source="fraction_sale" label="Fração de venda" required />
          <TextInput
            source="observation"
            label="Observação"
            multiline
            required
          />
          <TextInput
            source="nutritional_information"
            label="Informações nutricionais"
            multiline
            required
          />
          <BololeanInputsContainer>
            <BooleanInput
              source="organic"
              label="Produto é orgânico?"
              defaultValue={true}
            />
            <BooleanInput
              source="highlights"
              label="Colocar produto nos destaques?"
              defaultValue={false}
            />
          </BololeanInputsContainer>
          <ImageInput
            source="image"
            label="Imagem do produto"
            multiple={false}
            required
          >
            <ImageField label="src" />
          </ImageInput>
        </Form>
      </Create>
    </>
  )
}

export default ProductCreate
