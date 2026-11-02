import styled from "styled-components";

export const Card = styled.div`
  background: ${({ theme }) => theme.card.background};

  border: ${({ theme }) => theme.card.border};

  border-radius: ${({ theme }) => theme.radius.xl};

  padding: ${({ theme }) => theme.spacing.lg};
`;

export const CardTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.lg};

  font-size: ${({ theme }) => theme.typography.sizes.md};

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const InfoList = styled.div`
  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.md};
`;

export const Row = styled.div`
  display: flex;

  justify-content: space-between;

  gap: ${({ theme }) => theme.spacing.md};

  padding-bottom: ${({ theme }) => theme.spacing.sm};

  border-bottom: 1px solid rgba(0,0,0,.05);

  &:last-child {
    border-bottom: none;

    padding-bottom: 0;
  }
`;

export const Label = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;

export const Value = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};

  font-weight: ${({ theme }) => theme.typography.weights.medium};

  text-align: right;
`;