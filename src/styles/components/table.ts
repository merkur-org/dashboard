import styled from 'styled-components'

export const Table = styled.table`
  width: 100%;
  font-size: 1.6rem;
  margin-top: 2.4rem;
  border-spacing: 0;
  display: block;
  overflow: auto;
  table-layout: fixed;
  border-collapse: collapse;

  th {
    width: 100%;
    white-space: nowrap;
    background-color: ${({ theme }) => theme.colors.orangePrimary};
    padding: 0.8rem 5.6rem;
    color: ${({ theme }) => theme.colors.white};
    &:first-child {
      border-radius: 1.6rem 0 0 0;
    }
    &:last-child {
      border-radius: 0 1.6rem 0 0;
    }
  }

  th + th {
    border-left: 0.2rem solid ${({ theme }) => theme.colors.yellowPrimary};
  }

  td {
    border-bottom: 0.1rem solid ${({ theme }) => theme.colors.orangePrimary};
    width: 100%;
    white-space: nowrap;
  }

  .product-image {
    display: flex;
    align-items: center;
    img {
      width: fit-content;
      object-fit: cover;
      object-position: center;
      max-height: 8.8rem;
      max-width: 15.4rem;
    }
  }

  .product-name {
    white-space: nowrap;
    width: 100%;
    font-weight: 100;
    margin-left: 2.4rem;
  }

  .price,
  .total {
    font-size: 2.4rem;
    text-align: center;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.gray};
  }

  .actions {
    border: none;
    background-color: transparent;
    font-size: 1.6rem;
    font-weight: 100;
    width: 100%;
    white-space: nowrap;
    padding: 0 2.4rem;
    display: flex;
    justify-content: center;
    svg {
      margin-right: 0.8rem;
    }
  }

  .error {
    color: ${({ theme }) => theme.colors.error};
  }

  .details {
    color: ${({ theme }) => theme.colors.orangePrimary};
  }

  .date {
    font-size: 2.4rem;
    text-align: center;
    font-weight: 100;
    padding: 2.4rem 0;
    color: ${({ theme }) => theme.colors.gray};
  }

  .text {
    font-size: 1.6rem;
    text-align: center;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.gray};

    padding: 0 4.8rem;
  }
`
