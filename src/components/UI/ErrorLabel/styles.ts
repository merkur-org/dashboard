import styled from 'styled-components'

export const Error = styled.p`
  font-size: 12px;
  text-align: right;

  margin-top: 8px;

  color: ${({ theme }) => theme.colors.error};
`
