import styled from "styled-components";

export const StatsGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));

  gap: ${({ theme }) => theme.spacing.lg};

  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const StatCard = styled.div`
  display: flex;

  align-items: center;

  gap: 18px;

  padding: 24px;

  background: ${({ theme }) => theme.card.background};

  border: ${({ theme }) => theme.card.border};

  border-radius: ${({ theme }) => theme.radius.xl};

  transition: ${({ theme }) => theme.animation.fast};

  &:hover {
    transform: translateY(-3px);

    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
  }
`;

export const IconWrapper = styled.div`
  width: 58px;

  height: 58px;

  border-radius: 16px;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 1.35rem;

  color: ${({ color }) => color};

  background: ${({ color }) => `${color}15`};

  flex-shrink: 0;
`;

export const StatContent = styled.div`
  display: flex;

  flex-direction: column;

  gap: 4px;
`;

export const StatValue = styled.h3`
  margin: 0;

  font-size: 1.9rem;

  font-weight: ${({ theme }) => theme.typography.weights.bold};

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const StatLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.sm};

  color: ${({ theme }) => theme.colors.text.secondary};
`;
