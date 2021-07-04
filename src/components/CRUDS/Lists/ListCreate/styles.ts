import styled from 'styled-components'
import { SimpleForm } from 'react-admin'
import { Paper } from '@material-ui/core'
import { breakPoints } from '../../../../styles/constants'

export const Form = styled(SimpleForm)`
  @media ${breakPoints.tablet} {
    .MuiCardContent-root,
    .RaCardContentInner-root-96 {
      display: flex;
      flex-wrap: wrap;

      div {
        width: 100%;
      }
      &:last-child {
        border: 1px solid red;
      }
    }
  }
`

export const BololeanInputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: nowrap;

  @media ${breakPoints.tablet} {
    flex-direction: row;
    align-items: center;
  }
`
