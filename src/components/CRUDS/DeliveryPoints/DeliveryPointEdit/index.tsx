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
import { LatLngTuple } from 'leaflet'
import AddMarker from '../../../UI/AddMarker'
import PositionInputField from '../../../UI/PositionInputField'
import api from '../../../../services/api'

const DeliveryPointEditActions = (props: EditActionsProps) => {
  return (
    <Toolbar>
      <ListButton label="voltar" icon={<MdArrowBack />} />
      <CloneButton record={props.data} basePath={props.basePath} />
    </Toolbar>
  )
}

const DeliveryPointEditTitle = ({ record }: TitleProps) => {
  return <span> Editar produto {record.name}</span>
}

interface UFProps {
  id: string
  name: string
}

const DeliveryPointEdit: React.FC<EditProps> = props => {
  const [ufs, setUfs] = useState<UFProps[]>()
  const [selectedPosition, setSelectedPosition] = useState<LatLngTuple>([0, 0])

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

  function ChangeView({ center, zoom }) {
    const map = useMap()
    map.setView(center, zoom)
    return null
  }

  return (
    <Edit
      {...props}
      title={<DeliveryPointEditTitle />}
      actions={<DeliveryPointEditActions />}
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
