import React, { Children, cloneElement } from 'react'
import { ActionsList } from './styles'

const ActionToolbar = ({ children, ...props }: any) => {
  return (
    <ActionsList>
      {Children.map(children, button => cloneElement(button, props))}
    </ActionsList>
  )
}

export default ActionToolbar
