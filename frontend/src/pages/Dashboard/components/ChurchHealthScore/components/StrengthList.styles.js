import styled from "styled-components";

export const Container = styled.div`
  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.md};

  padding: ${({ theme }) => theme.spacing.lg};

  border-radius: ${({ theme }) => theme.radius.lg};

  background: rgba(34, 197, 94, 0.08);

  border: 1px solid rgba(34, 197, 94, 0.18);
`;

export const Title = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.md};

  font-weight: ${({ theme }) => theme.typography.weights.bold};

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const List = styled.div`
  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Item = styled.div`
  display: flex;

  align-items: center;

  gap: ${({ theme }) => theme.spacing.sm};

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Icon = styled.span`
  display: flex;

  color: #16a34a;

  font-size: 16px;
`;
