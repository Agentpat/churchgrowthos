import styled from "styled-components";

export const StatsContainer = styled.div`
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};

  background: ${({ theme }) => theme.card.background};

  border: ${({ theme }) => theme.card.border};

  border-radius: ${({ theme }) => theme.radius.xl};
`;

export const Label = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: 14px;
`;

export const Value = styled.div`
  font-size: 24px;

  font-weight: bold;

  margin-top: 8px;
`;
