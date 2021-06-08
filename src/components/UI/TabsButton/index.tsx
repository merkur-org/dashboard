import {
  useRef,
  useEffect,
  useCallback,
  ChangeEvent,
  InputHTMLAttributes
} from 'react'
import { useField } from '@unform/core'
import { Container, SelectionLine } from './styles'

interface ButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
  isSelected: boolean
  setIsSelected(select: boolean): void
}

const TabsButton: React.FC<ButtonProps> = ({
  name,
  label,
  isSelected,
  setIsSelected,
  ...rest
}) => {
  const inputRef = useRef(null)
  const { fieldName, registerField } = useField(name)
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'checked'
    })
  }, [fieldName, registerField])

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    event.target.checked ? setIsSelected(true) : setIsSelected(false)
  }, [])

  return (
    <Container isSelected={isSelected} htmlFor={label}>
      <SelectionLine isSelected={isSelected} />
      <label htmlFor={label}>{label}</label>
      <input
        type="checkbox"
        name={name}
        onChange={handleChange}
        ref={inputRef}
        id={label}
        checked={isSelected}
        {...rest}
      />
    </Container>
  )
}

export default TabsButton
