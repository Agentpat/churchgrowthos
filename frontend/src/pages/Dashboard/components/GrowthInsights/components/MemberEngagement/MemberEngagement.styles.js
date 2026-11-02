import styled from "styled-components";

export const Container = styled.section`
  width: 100%;

  margin-top: ${({ theme }) => theme.spacing.xl};
`;

export const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const Title = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.lg};

  font-weight: ${({ theme }) => theme.typography.weights.bold};

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Grid = styled.div`
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
