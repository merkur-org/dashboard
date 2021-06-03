import { Link } from 'react-router-dom'
import { BodyField } from './styles'
import { Error } from '../ErrorLabel/styles'
import { IoMdAlert } from 'react-icons/io'

interface FieldProps {
  name: string
  label?: string
  subLabel?: string
  pathSubLabel?: string
  error?: string
  isEmpty: boolean
}
const FieldText: React.FC<FieldProps> = ({
  name,
  label,
  subLabel,
  pathSubLabel,
  error,
  isEmpty,
  children
}) => {
  return (
    <>
      <BodyField isEmpty={isEmpty} isErrored={!!error} htmlFor={name}>
        <div id="border-selected"></div>
        <div id="border-error"></div>
        <div id="border-bottom"></div>
        {children}
        {pathSubLabel && <Link to={`/${pathSubLabel}`}>{subLabel}</Link>}
        <label htmlFor={name}>{label}</label>
      </BodyField>
      {error && <Error>{error}</Error>}
    </>
  )
}

export default FieldText
