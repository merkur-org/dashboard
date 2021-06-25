import styled, { css } from 'styled-components'
import { breakPoints, effects } from '../../styles/constants'

interface PageProps {
  isLoading: boolean
}

export const Container = styled.div<PageProps>`
  font-family: 'Roboto Slab', serif;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;

  ${props =>
    props.isLoading &&
    css`
      cursor: wait;
    `}
  h1 {
    margin: 0;
    padding: 0;
    /* BEM VINDO */

    font-weight: bold;
    font-size: 24px;
    /* Black Text */
    color: ${({ theme }) => theme.colors.black};
  }
  h2 {
    /* Informe seus dados para iniciar a sessÃ£o */
    font-weight: 400;
    font-size: 12px;

    margin: 0;
    padding: 0;

    /* Black Text */
    color: ${({ theme }) => theme.colors.black};
  }

  @media ${breakPoints.mobileL} {
    h1 {
      font-size: 36px;
    }
    h2 {
      font-size: 16px;
    }
  }
`

export const BackgroundOrange = styled.div`
  /* Rectangle 25 */
  position: absolute;
  top: 0;
  height: 41.3%;
  width: 100vw;

  z-index: -100;

  background: ${({ theme }) => theme.colors.orangePrimary};
`
export const BackgroundWhiteRectangle = styled.div`
  background: ${({ theme }) => theme.colors.white};

  box-shadow: ${effects.dropShadow};
  border-radius: 8px;

  margin: 0 16px;

  @media ${breakPoints.mobileL} {
    max-width: 464px;
  }
`
export const WelcomeContainer = styled.div`
  padding: 32px;
`

export const FormContainer = styled.div`
  border-top: 1px solid #efeded;
  padding: 0 32px 32px 32px;
`

export const InputContainer = styled.div`
  margin-bottom: 24px;
  width: 100%;
`

export const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 48px;

  @media ${breakPoints.mobileL} {
    max-width: 220px;
  }
`

export const LinksContainer = styled.div`
  margin-top: 0.8rem;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;

  font-size: 12px;

  a {
    color: ${({ theme }) => theme.colors.gray};
  }
`
