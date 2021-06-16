import { transitions } from '../../../styles/constants'
import styled, { css } from 'styled-components'

interface ButtonProps {
  isSelected: boolean
}

export const Container = styled.label<ButtonProps>`
  background: transparent;
  border: none;
  cursor: pointer;
  position: relative;

  &::before {
    border: none;
  }

  padding: 0 12px;

  input {
    visibility: hidden;
    position: absolute;
  }

  label {
    cursor: pointer;
    position: relative;
    top: 12px;
  }

  ${props =>
    props.isSelected
      ? css`
          color: ${({ theme }) => theme.colors.black};
        `
      : css`
          color: ${({ theme }) => theme.colors.gray};
        `}
`

export const SelectionLine = styled.div<ButtonProps>`
  width: 0%;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.yellowPrimary};
  position: absolute;
  left: 0;
  margin-bottom: 12px;

  transition: ${transitions.hover};
  ${props =>
    props.isSelected &&
    css`
      width: 100%;
    `};
`
