import {
  TextInput,
  SelectInput,
  Edit,
  ListButton,
  Toolbar,
  TitleProps,
  useTranslate,
  TabbedForm,
  FormTab,
  ImageInput,
  ImageField,
  BooleanInput,
  CloneButton,
  EditActionsProps
} from 'react-admin'
import React from 'react'

import { Form } from './styles'

import { categories, units } from '../ProductsSelect'
import BackButton from '../../../UI/BackButton'
import { MdArrowBack } from 'react-icons/md'

const ProductEditActions = (props: EditActionsProps) => {
  return (
    <Toolbar>
      <ListButton label="voltar" icon={<MdArrowBack />} />
      <CloneButton record={props.data} basePath={props.basePath} />
    </Toolbar>
  )
}

const ProductEditTitle = ({ record }: TitleProps) => {
  return <span> Editar produto {record.name}</span>
}

const ProductEdit: React.FC = props => {
  return (
    <Edit
      {...props}
      title={<ProductEditTitle />}
      actions={<ProductEditActions />}
    >
      <Form warnWhenUnsavedChanges>
        <FormTab label="Informações do produto">
          <TextInput source="name" label="Nome" />
          <TextInput
            source="cost_price"
            label="Preço de custo"
            placeholder="R$"
          />
          <SelectInput
            source="category"
            label="Categoria"
            choices={categories}
          />
          <TextInput
            source="wholesale_price"
            label="Preço de atacado"
            placeholder="R$"
          />
          <SelectInput
            source="unit_buy"
            label="Unidade de compra"
            choices={units}
          />
          <TextInput source="fraction_buy" label="Fração de compra" />
          <SelectInput
            source="unit_sale"
            label="Unidade de venda"
            choices={units}
          />
          <TextInput source="fraction_sale" label="Fração de venda" />
          <TextInput
            source="sale_price"
            label="Preço de venda"
            placeholder="R$"
          />
          <TextInput source="observation" label="Observação" multiline />
          <BooleanInput source="organic" label="Produto é orgânico?" />
        </FormTab>
        <FormTab label="imagem">
          <ImageInput source="image" label="Imagem do produto" multiple={false}>
            <ImageField src="src" />
          </ImageInput>
        </FormTab>
      </Form>
    </Edit>
  )
}

export default ProductEdit
