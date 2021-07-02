import React, { useState, useCallback, useEffect, useContext } from 'react'
import {
  Create,
  TextInput,
  SelectInput,
  ListButton,
  CreateProps,
  Toolbar,
  NumberInput
} from 'react-admin'
import { Field } from 'react-final-form'
import { MdArrowBack } from 'react-icons/md'
import axios from 'axios'
import Cookies from 'js-cookie'
import { LatLngExpression, LatLngTuple } from 'leaflet'
import { MapContainer, TileLayer } from 'react-leaflet'

import AddMarker from '../../../UI/AddMarker'

import { Form } from './styles'
import PositionInputField from '../../../UI/PositionInputField'

const DeliveryPointCreateActions: React.FC = () => {
  return (
    <Toolbar>
      <ListButton label="voltar" icon={<MdArrowBack />} />
    </Toolbar>
  )
}

interface UFProps {
  id: string
  name: string
}

const DeliveryPointCreate: React.FC<CreateProps> = props => {
  const [ufs, setUfs] = useState<UFProps[]>()
  const [selectedPosition, setSelectedPosition] = useState<LatLngTuple>([
    -26.2167164, -52.666736
  ])
  const [initialPosition] = useState<LatLngTuple>([-26.2167164, -52.666736])

  useEffect(() => {
    async function fetchUfs() {
      const { data } = await axios.get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
      )

      const states = data.map(uf => {
        return {
          id: uf.sigla,
          name: uf.sigla
        }
      })

      setUfs(states)
    }
    fetchUfs()
  }, [])

  return (
    <>
      <Create
        {...props}
        title="Adicionar novo ponto de entrega"
        actions={<DeliveryPointCreateActions />}
        options={{ position: selectedPosition }}
      >
        <Form
          validate={values => {
            const errors = {} as any
            ;['city', 'state', 'suburb', 'street', 'number', 'cep'].forEach(
              field => {
                if (!values[field]) {
                  errors[field] = 'Campo Obrigatório'
                }
              }
            )

            return errors
          }}
        >
          <TextInput source="city" label="Cidade" autoFocus required />
          <SelectInput source="state" label="Estado" choices={ufs} required />
          <TextInput source="suburb" label="Bairro" required />
          <TextInput source="street" label="Rua" required />
          <NumberInput source="number" label="Número" required />
          <TextInput source="cep" label="CEP" required />
          <MapContainer center={initialPosition} zoom={13} fullwidth>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <AddMarker
              name="position"
              source="latitude"
              isRequired
              position={selectedPosition}
              setPosition={setSelectedPosition}
            />
          </MapContainer>
          <PositionInputField
            source="latitude"
            name="latitude"
            position={selectedPosition[0]}
          />
          <PositionInputField
            source="longitude"
            name="longitude"
            position={selectedPosition[1]}
          />
        </Form>
      </Create>
    </>
  )
}

export default DeliveryPointCreate
