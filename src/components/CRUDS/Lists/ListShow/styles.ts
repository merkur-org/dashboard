import styled from 'styled-components'
import { SimpleShowLayout } from 'ra-ui-materialui'
import { breakPoints } from '../../../../styles/constants'

export const ShowData = styled(SimpleShowLayout)`
  img {
    border-radius: 16px;
    width: 220px;
    height: 176px;
    object-fit: cover;
  }

  div {
    div {
      padding: 0;
      margin-bottom: 8px;
    }

    label {
      padding-bottom: 0;
      font-size: 24px;
    }
  }

  @media ${breakPoints.tablet} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`
