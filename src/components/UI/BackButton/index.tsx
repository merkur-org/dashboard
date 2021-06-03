import { Link } from 'react-router-dom'
import { FaLongArrowAltLeft } from 'react-icons/fa'

import { Container } from './styles'

interface ButtonProps {
  link?: string
}

const BackButton: React.FC<ButtonProps> = ({ link }) => {
  return (
    <Container>
      <Link to={`/${link || ''}`}>
        <a>
          <FaLongArrowAltLeft />
          voltar para home
        </a>
      </Link>
    </Container>
  )
}

export default BackButton
