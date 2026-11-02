import styled from "styled-components";

export const Header = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: ${({ theme }) => theme.spacing.lg};

  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 768px) {
    flex-direction: column;

    align-items: stretch;
  }
`;

export const Left = styled.div`
  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.xs};
`;

export const Right = styled.div`
  display: flex;

  align-items: center;

  gap: ${({ theme }) => theme.spacing.sm};

  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    flex-direction: column;

    align-items: stretch;
  }
`;

export const Title = styled.h1`
  margin: 0;

  font-size: ${({ theme }) => theme.typography.sizes["2xl"]};

  font-weight: ${({ theme }) => theme.typography.weights.bold};

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Description = styled.p`
  margin: 0;

  max-width: 650px;

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  line-height: 1.6;

  color: ${({ theme }) => theme.colors.text.secondary};
`;
