import styled, { css } from 'styled-components'

export const BodyField = styled.label<{ isEmpty: boolean; isErrored: boolean }>`
  width: 100%;
  min-width: 264px;
  min-height: 32px;

  position: relative;
  display: flex;
  align-items: center;

  cursor: text;
  font-size: 16px;
  font-weight: 400;

  label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 8px;

    color: ${({ theme }) => theme.colors.gray};

    transition: 0.5s;
    cursor: pointer;
  }

  #border-bottom {
    width: 100%;
    height: 1px;

    position: absolute;
    left: 0;
    bottom: 0;

    background: ${({ theme }) => theme.colors.gray};

    transition: 0.5s all;
  }

  #border-selected {
    width: 0;
    height: 0;

    position: absolute;
    left: 50%;
    bottom: 0;

    transition: 0.5s all;
  }

  #border-error {
    width: 0;
    height: 0;

    position: absolute;
    left: 50%;
    bottom: 0;

    transition: 0.5s all;
  }

  :focus-within {
    border-bottom: 0;

    label {
      top: -16px;
      color: ${({ theme }) => theme.colors.greenPrimary};

      font-size: 12px;
    }

    #border-bottom {
      width: 0;

      left: 50%;
    }

    #border-selected {
      left: 0;

      width: 100%;
      height: 2px;

      background: ${({ theme }) => theme.colors.greenPrimary};
    }

    ${props =>
      props.isErrored &&
      css`
        label {
          color: ${({ theme }) => theme.colors.error};
        }
      `}
  }
  ${props =>
    !props.isEmpty &&
    css`
      label {
        top: -12px;
        font-size: 12px;
      }
    `}
  ${props =>
    props.isErrored &&
    css`
      label {
        color: ${({ theme }) => theme.colors.error};
      }

      #border-bottom {
        width: 0;
      }

      #border-error {
        left: 0;

        width: 100%;
        height: 2px;

        background: ${({ theme }) => theme.colors.error};
      }
    `}

  :focus-within::after {
    width: 100%;
    height: 1.92px;
    content: '';
    position: absolute;
    bottom: 0;
  }
`
