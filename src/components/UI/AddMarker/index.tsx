import React, { Dispatch, SetStateAction, useState } from 'react'
import {
  InputProps,
  useInput,
  Labeled,
  ArrayField,
  NumberField
} from 'react-admin'
import { Field, useField } from 'react-final-form'
import { TextField } from '@material-ui/core'
import { LatLngExpression, LeafletMouseEvent } from 'leaflet'
import { useMapEvents, Marker } from 'react-leaflet'

interface AddMarkerProps extends InputProps {
  position: LatLngExpression
  setPosition: Dispatch<SetStateAction<LatLngExpression>>
  name: string
}

const AddMarker: React.FC<AddMarkerProps> = ({
  position,
  setPosition,
  name,
  ...props
}) => {
  useMapEvents({
    click: (e: LeafletMouseEvent) => {
      setPosition([e.latlng.lat, e.latlng.lng])
    }
  })

  return position === null ? null : <Marker position={position} />
}

export default AddMarker
