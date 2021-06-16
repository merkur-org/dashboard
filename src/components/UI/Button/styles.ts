import { border, effects, transitions } from '../../../styles/constants'
import styled, { keyframes, css } from 'styled-components'

const buttonClicked = keyframes`
  50%{
    transform: scale(0.95)
  }

  100%{
    transform: scale(1)
  }
`

interface ContainerProps {
  buttonType?: string
}

export const Container = styled.button<ContainerProps>`
  ${props =>
    props.buttonType === 'greenPrimary' &&
    css`
      background-color: ${({ theme }) => theme.colors.greenPrimary};

      &:hover {
        background-color: ${({ theme }) => theme.colors.greenSecundary};
      }

      &:active {
        animation: ${buttonClicked} 0.1s ease-in-out;
        background-color: ${({ theme }) => theme.colors.darkGreen};
      }
    `}

  ${props =>
    props.buttonType === 'orangePrimary' &&
    css`
      background-color: ${({ theme }) => theme.colors.orangePrimary};

      &:hover {
        background-color: ${({ theme }) => theme.colors.orangeSecundary};
      }

      &:active {
        animation: ${buttonClicked} 0.1s ease-in-out;
        background-color: ${({ theme }) => theme.colors.darkOrange};
      }
    `}

  box-shadow: 0 0 0 0;
  border: 0 none;
  outline: 0;
  text-decoration: none;
  cursor: pointer;

  color: ${({ theme }) => theme.colors.white};
  transition: background ${transitions.hover};
  cursor: pointer;
  font-family: 'Roboto Slab', serif;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 16px;
  font-weight: bold;

  border: none;
  border-radius: ${border.borderRadius};
  box-shadow: ${effects.dropShadow};
  padding: 16px;

  width: 100%;
  min-width: 220px;
  min-height: 48px;
`
