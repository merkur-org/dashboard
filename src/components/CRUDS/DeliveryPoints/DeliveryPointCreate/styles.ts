import styled from 'styled-components'
import { SimpleForm } from 'react-admin'
import { Paper } from '@material-ui/core'
import { breakPoints } from '../../../../styles/constants'

export const Form = styled(SimpleForm)`
  .leaflet-container {
    height: 300px;
    width: 100%;
  }

  .leaflet-touch .leaflet-control-layers,
  .leaflet-touch .leaflet-bar {
    border: none;
  }

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
