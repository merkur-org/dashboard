import { breakPoints } from '../../../styles/constants'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;

  position: absolute;
  top: 1.6rem;
  left: 1.6rem;

  a {
    color: ${({ theme }) => theme.colors.white};
    font-size: 1.6rem;

    svg {
      margin-right: 0.8rem;
    }
  }

  @media ${breakPoints.tablet} {
    top: 3.2rem;
    left: 3.2rem;
  }
`
