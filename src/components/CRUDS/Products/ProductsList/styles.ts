import styled from 'styled-components'
import { ImageField } from 'ra-ui-materialui'

export const ProductImageField = styled(ImageField)`
  div {
    padding: 0;
    margin: 0;
  }

  img {
    width: 220px;
    height: 176px;
    object-fit: cover;
    padding: 0;
    margin: 0;
  }
`

export const ProductListActions = styled.div`
  display: flex;
  align-items: center;
  margin-top: -1;
  margin-bottom: -1;
`
