import { IconBaseProps } from 'react-icons'
import { ButtonHTMLAttributes } from 'react'
import { useHistory } from 'react-router-dom'

import { Container } from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  icon?: React.ComponentType<IconBaseProps>
  buttonType?: string
  link?: string
}

const Button: React.FC<ButtonProps> = ({
  text,
  icon: Icon,
  buttonType,
  link,
  ...rest
}) => {
  const history = useHistory()

  function handleNavigate(link: string) {
    history.push(link)
  }

  return (
    <Container
      buttonType={buttonType || 'greenPrimary'}
      onClick={() => {
        link && handleNavigate(link)
      }}
      {...rest}
    >
      <span>{text}</span>
      {Icon && <Icon />}
    </Container>
  )
}

export default Button
