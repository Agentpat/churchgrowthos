import styled from "styled-components";

export const ChartCard = styled.div`
  width: 100%;

  padding: ${({ theme }) => theme.spacing.lg};

  border-radius: ${({ theme }) => theme.radius.xl};

  background: rgba(255, 255, 255, 0.55);

  backdrop-filter: blur(16px);

  border: 1px solid rgba(255, 255, 255, 0.35);

  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const ChartHeader = styled.div`
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const ChartTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.md};

  font-weight: ${({ theme }) => theme.typography.weights.bold};

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ChartSubtitle = styled.p`
  margin-top: 4px;

  font-size: ${({ theme }) => theme.typography.sizes.xs};

  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const GrowthBadge = styled.span`
  padding: 5px 10px;

  border-radius: 999px;

  font-size: ${({ theme }) => theme.typography.sizes.xs};

  font-weight: ${({ theme }) => theme.typography.weights.medium};

  background: ${({ positive }) =>
    positive ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)"};

  color: ${({ positive }) => (positive ? "rgb(22,163,74)" : "rgb(220,38,38)")};
`;
export const EmptyState = styled.div`
  height: 180px;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  color: ${({ theme }) => theme.colors.text.secondary};
`;
