import styled from 'styled-components'
import { SimpleForm, TabbedForm } from 'react-admin'
import { breakPoints } from '../../../../styles/constants'

export const Form = styled(SimpleForm)`
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

export const BololeanInputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: nowrap;

  .MuiTypography-root {
    white-space: nowrap;
  }

  @media ${breakPoints.tablet} {
    flex-direction: row;
    align-items: center;
  }
`
