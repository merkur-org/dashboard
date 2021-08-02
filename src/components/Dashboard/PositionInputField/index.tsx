import React, { useEffect, useState } from 'react'
import { InputProps, useInput } from 'react-admin'
import { TextField } from '@material-ui/core'

interface PositionInputFieldProps extends InputProps {
  position: number
}

const PositionInputField: React.FC<PositionInputFieldProps> = ({
  name,
  position,
  ...props
}) => {
  const {
    input: { onChange, ...rest },
    isRequired
  } = useInput(props)

  useEffect(() => {
    onChange(position)
  }, [position])

  return (
    <TextField
      style={{ display: 'none' }}
      name={name}
      value={position}
      required={isRequired}
      onChange={onChange}
      {...rest}
    />
  )
}

export default PositionInputField
