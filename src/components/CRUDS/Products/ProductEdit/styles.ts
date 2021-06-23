import styled from 'styled-components'
import { TabbedForm } from 'react-admin'
import { breakPoints } from '../../../../styles/constants'

export const Form = styled(TabbedForm)`
  @media ${breakPoints.tablet} {
    div:nth-child(3) span {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: 1.6rem;

      div {
        width: 100%;
      }
    }
  }
`
