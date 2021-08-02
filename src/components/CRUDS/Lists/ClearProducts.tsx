import React, { useCallback, useEffect } from 'react'
import { Button, ButtonProps } from 'ra-ui-materialui'
import { useForm } from 'react-final-form'

interface ClearProductsProps extends ButtonProps {
  state: string
}

const ClearProducts: React.FC<ClearProductsProps> = ({ state, ...props }) => {
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

export default ClearProducts
