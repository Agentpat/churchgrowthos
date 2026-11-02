import styled from "styled-components";

export const Header = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: ${({ theme }) => theme.spacing.md};

  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    align-items: flex-start;

    flex-direction: column;
  }
`;

export const Left = styled.div`
  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.xs};
`;

export const Title = styled.h1`
  margin: 0;

  color: ${({ theme }) => theme.colors.text.primary};

  font-size: ${({ theme }) => theme.typography.sizes["2xl"]};

  font-weight: ${({ theme }) => theme.typography.weights.bold};
`;

export const Description = styled.p`
  margin: 0;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;

export const Right = styled.div`
  display: flex;

  align-items: center;
`;
