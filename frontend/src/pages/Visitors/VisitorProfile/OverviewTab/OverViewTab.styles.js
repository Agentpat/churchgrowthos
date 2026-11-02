import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export const Grid = styled.div`
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;
