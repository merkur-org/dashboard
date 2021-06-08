import styled from 'styled-components'

export const Error = styled.p`
  font-size: 1.2rem;
  text-align: right;

  margin-top: 0.8rem;

  color: ${({ theme }) => theme.colors.error};
`
