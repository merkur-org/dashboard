import {
  useEffect,
  useRef,
  InputHTMLAttributes,
  ChangeEvent,
  FormEvent,
  useCallback,
  useState
} from 'react'
import { useField } from '@unform/core'

import FieldText from '../FieldText'

import { BodyInput } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  subLabel?: string
  pathSubLabel?: string
  mask?(value: string): string
}
/**
 * This component receives text in your field
 *
 * @component
 * @param {string} name is the name on the form data
 * @param {string} label is the title that is displayed above the component
 * @param {string} subLabel is a link for redirecting to the pathSubLabel
 * @param {string} pathSubLabel is the url of link subLabel
 * @example
 * return (
 *   <Input name="senha" type="password" label="Senha" subLabel="Esqueceu a senha?" pathSubLabel="/alterar-senha" />
 * )
 */
const Input: React.FC<InputProps> = ({
  name,
  label,
  subLabel,
  pathSubLabel,
  mask,
  ...rest
}) => {
  const inputRef = useRef(null)
  const { fieldName, defaultValue, registerField, error } = useField(name)
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])
  const [inputIsEmpty, setInputIsEmpty] = useState(
    !rest.defaultValue && rest.defaultValue !== ''
  )
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== '') {
      setInputIsEmpty(false)
    } else {
      setInputIsEmpty(true)
    }
  }, [])

  // máscara de input para o telefone
  const handleKeyUp = useCallback((event: any) => {
    if (mask) {
      event.target.value = mask(event.target.value)
    }
  }, [])

  return (
    <BodyInput>
      <FieldText
        name={name}
        label={label}
        error={error && error}
        isEmpty={inputIsEmpty}
        subLabel={subLabel}
        pathSubLabel={pathSubLabel}
      >
        <input
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          ref={inputRef}
          defaultValue={defaultValue}
          type="text"
          id={fieldName}
          {...rest}
        />
      </FieldText>
    </BodyInput>
  )
}

export default Input
