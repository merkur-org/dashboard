import { Container } from './styles'

interface MessagesProps {
  message: string
  open: boolean
  type: string
}

const ModalMessage: React.FC<MessagesProps> = ({ message, open, type }) => {
  return (
    <Container isOpen={open} type={type}>
      <p>{message}</p>
    </Container>
  )
}

export default ModalMessage
