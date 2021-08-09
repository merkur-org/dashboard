import {
  TextInput,
  SelectInput,
  Edit,
  ListButton,
  Toolbar,
  TitleProps,
  CloneButton,
  EditActionsProps,
  NumberInput,
  EditProps
} from 'react-admin'
import React, { useState, useEffect } from 'react'

import { Form } from './styles'

import { MdArrowBack } from 'react-icons/md'

import axios from 'axios'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { LatLngExpression, LatLngTuple } from 'leaflet'
import AddMarker from '../../../UI/AddMarker'
import PositionInputField from '../../../Dashboard/PositionInputField'
import api from '../../../../services/api'
import ActionToolbar from '../../../Dashboard/ActionToolBar'
import CrudTitle from '../../../Dashboard/CrudTitlte'

interface UFProps {
  id: string
  name: string
}

const DeliveryPointEdit: React.FC<EditProps> = props => {
  const [ufs, setUfs] = useState<UFProps[]>()
  const [selectedPosition, setSelectedPosition] = useState<any>([0, 0])

  useEffect(() => {
    async function fetchLatLng() {
      const { data } = await api.get(`/delivery-points/${props.id}`)

      setSelectedPosition([data.latitude, data.longitude])
    }

    fetchLatLng()
  }, [])

  useEffect(() => {
    async function fetchUfs() {
      const { data } = await axios.get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
      )

      console.log(data)

      const states = data.map((uf: any) => {
        return {
          id: uf.sigla,
          name: uf.sigla
        }
      })

      setUfs(states)
    }
    fetchUfs()
  }, [])

  interface IChangeView {
    center: LatLngExpression
    zoom?: number
  }

  function ChangeView({ center, zoom }: IChangeView) {
    const map = useMap()
    map.setView(center, zoom)
    return null
  }

  return (
    <Edit
      {...props}
      title={<CrudTitle content="Editar ponto de entrega" />}
      actions={
        <ActionToolbar>
          <ListButton label="voltar" icon={<MdArrowBack />} />
        </ActionToolbar>
      }
      mutationMode="pessimistic"
    >
      <Form>
        <TextInput source="city" label="Cidade" autoFocus />
        <SelectInput source="state" label="Estado" choices={ufs} />
        <TextInput source="suburb" label="Bairro" />
        <TextInput source="street" label="Rua" />
        <NumberInput source="number" label="Número" min={1} />
        <TextInput source="cep" label="CEP" />
        <MapContainer center={selectedPosition} zoom={13} fullwidth>
          <ChangeView center={selectedPosition} zoom={13} />
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
    </Edit>
  )
}

export default DeliveryPointEdit
