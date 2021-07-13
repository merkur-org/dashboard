import styled from 'styled-components'
import { ImageField } from 'ra-ui-materialui'
import { withStyles, Card as MuiCard } from '@material-ui/core'
import { breakPoints } from '../../../../styles/constants'

export const ListsListActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: -1;
  margin-bottom: -1;
`

export const Card = styled(MuiCard)`
  order: -1;
  width: '15em';
  margin-right: '1em';

  @media ${breakPoints.tablet} {
  }
`
