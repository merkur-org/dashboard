import styled from 'styled-components'
import { SimpleForm, TabbedForm } from 'react-admin'
import { breakPoints } from '../../../../styles/constants'

export const Form = styled(SimpleForm)`
  @media ${breakPoints.tablet} {
    div:nth-child(3) span {
      display: flex;
      flex-wrap: wrap;

      div {
        width: 100%;
      }
    }
  }
`
