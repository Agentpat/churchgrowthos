import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};

  background: ${({ theme }) => theme.card.background};

  border: ${({ theme }) => theme.card.border};

  border-radius: ${({ theme }) => theme.radius.xl};
`;

export const CardTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const InfoRow = styled.div`
  display: flex;

  gap: ${({ theme }) => theme.spacing.md};

  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const Icon = styled.div`
  color: ${({ theme }) => theme.colors.primary.main};

  margin-top: 4px;
`;

export const Label = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.sm};

  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Value = styled.div`
  font-weight: ${({ theme }) => theme.typography.weights.medium};
`;

export const GroupList = styled.div`
  display: flex;

  flex-wrap: wrap;

  gap: 8px;

  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const GroupItem = styled.span`
  padding: 6px 12px;

  border-radius: ${({ theme }) => theme.radius.pill};

  background: rgba(37, 99, 235, 0.12);

  color: ${({ theme }) => theme.colors.primary.main};

  font-size: 12px;

  font-weight: 600;
`;
