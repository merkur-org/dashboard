import styled from 'styled-components'
import { SimpleForm, TabbedForm } from 'react-admin'
import { breakPoints } from '../../../../styles/constants'

export const Form = styled(SimpleForm)`
  @media ${breakPoints.tablet} {
    .MuiCardContent-root,
    .RaCardContentInner-root-96 {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: 1.6rem;
      width: 100%;

      div {
        width: 100%;
      }
    }
  }
`
