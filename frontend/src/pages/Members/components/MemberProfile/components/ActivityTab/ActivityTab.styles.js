import styled from "styled-components";

export const Container = styled.div`
  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.md};
`;

export const Title = styled.h3`
  margin: 0;

  font-size: ${({ theme }) => theme.typography.sizes.lg};

  font-weight: ${({ theme }) => theme.typography.weights.bold};
`;

export const Description = styled.p`
  margin: 0;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;

export const Loader = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};

  display: flex;

  justify-content: center;

  align-items: center;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: ${({ theme }) => theme.typography.sizes.md};
`;

export const Empty = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};

  display: flex;

  justify-content: center;

  align-items: center;

  min-height: 150px;

  text-align: center;

  background: ${({ theme }) => theme.card.background};

  border: ${({ theme }) => theme.card.border};

  border-radius: ${({ theme }) => theme.radius.lg};

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: ${({ theme }) => theme.typography.sizes.md};
`;
