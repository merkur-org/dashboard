import styled from 'styled-components'
import { Paper } from '@material-ui/core'

export const DropzoneContainer = styled(Paper)`
  height: 300px;
  background: #efefef;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: no;
  border-style: dashed;
  border-color: #aaa;
  position: relative;

  label {
    height: 100%;
    width: 100%;
    position: absolute;

    z-index: 100;
    input {
      display: none;
    }
  }

  img {
    width: 220px;
    height: 176px;
    display: block;
    object-fit: contain;
  }

  p {
    user-select: none;
    color: #aaa;
  }
`
