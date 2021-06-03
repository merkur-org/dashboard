import { border, effects } from '../../../styles/constants'
import styled, { keyframes, css } from 'styled-components'

interface OpenModalProps {
  isOpen: boolean
  type: string
}

const openAnimation = keyframes`
  0% {
    bottom: -3.2rem;
  }
  25%{
    bottom: 3.2rem;
  }
  70%{
    bottom: 3.2rem;
  }
  85%{
    bottom: 4rem;
  }
  100%{
    bottom: -3.2rem;
  }
`

export const Container = styled.div<OpenModalProps>`
  display: none;

  p {
    transform: translateX(-50%);

    color: ${({ theme }) => theme.colors.white};
    box-shadow: ${effects.dropShadow};
    border-radius: ${border.borderRadius};

    font-size: 1.6rem;
    font-weight: bold;
    text-align: center;

    padding: 0.8rem;

    ${props => {
      if (props.type === 'success') {
        return css`
          background-color: ${({ theme }) => theme.colors.greenPrimary};
        `
      } else if (props.type === 'error') {
        return css`
          background-color: ${({ theme }) => theme.colors.redPrimary};
        `
      }
    }}
  }

  ${props =>
    props.isOpen &&
    css`
      display: flex;

      position: fixed;
      z-index: 100;
      left: 50%;

      animation: ${openAnimation} 2s ease-out;
    `}
`
