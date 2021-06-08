import styled, { css } from 'styled-components'
import { breakPoints, effects } from '../../styles/constants'

interface PageProps {
  isLoading: boolean
}

export const Container = styled.div<PageProps>`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  ${props =>
    props.isLoading &&
    css`
      cursor: wait;
    `}

  h1 {
    /* BEM VINDO */

    font-weight: bold;
    font-size: 2.4rem;

    /* Black Text */
    color: ${({ theme }) => theme.colors.black};
  }
  h2 {
    /* Informe seus dados para iniciar a sessÃ£o */

    font-weight: 400;
    font-size: 1.2rem;

    /* Black Text */
    color: ${({ theme }) => theme.colors.black};
  }

  @media ${breakPoints.mobileL} {
    h1 {
      font-size: 3.6rem;
    }
    h2 {
      font-size: 1.6rem;
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

  margin: 0 1.6rem;

  @media ${breakPoints.mobileL} {
    max-width: 46.4rem;
  }
`
export const WelcomeContainer = styled.div`
  padding: 3.2rem;
`

export const FormContainer = styled.div`
  border-top: 1px solid #efeded;
  padding: 0 3.2rem 3.2rem 3.2rem;
`

export const InputContainer = styled.div`
  margin-bottom: 2.4rem;
  width: 100%;
`

export const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 4.8rem;

  @media ${breakPoints.mobileL} {
    max-width: 22rem;
  }
`

export const LinksContainer = styled.div`
  margin-top: 0.8rem;
  margin-bottom: 2.4rem;
  display: flex;
  justify-content: space-between;

  a {
    color: ${({ theme }) => theme.colors.gray};
  }
`
