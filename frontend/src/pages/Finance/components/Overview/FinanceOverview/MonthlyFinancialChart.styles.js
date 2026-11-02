import styled from "styled-components";

// =====================================
// Card
// =====================================

export const Card = styled.section`
  width: 100%;

  background: ${({ theme }) => theme.colors.surface.default};

  border: 1px solid ${({ theme }) => theme.colors.border.default};

  border-radius: ${({ theme }) => theme.radius.md};

  padding: 22px;

  box-shadow: ${({ theme }) => theme.shadows.xs};

  transition: ${({ theme }) => theme.animation.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.light};

    box-shadow: ${({ theme }) => theme.shadows.sm};
  }

  @media (max-width: 768px) {
    padding: 18px;
  }

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

// =====================================
// Header
// =====================================

export const Header = styled.div`
  display: flex;

  align-items: flex-start;

  justify-content: space-between;

  gap: 20px;

  margin-bottom: 22px;

  padding-bottom: 18px;

  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};

  @media (max-width: 600px) {
    margin-bottom: 18px;

    padding-bottom: 15px;
  }
`;

// =====================================
// Header Content
// =====================================

export const HeaderContent = styled.div`
  min-width: 0;
`;

// =====================================
// Title
// =====================================

export const Title = styled.h3`
  margin: 0;

  color: ${({ theme }) => theme.colors.text.primary};

  font-size: ${({ theme }) => theme.typography.sizes.lg};

  line-height: 1.35;

  font-weight: ${({ theme }) => theme.typography.weights.bold};

  letter-spacing: -0.01em;
`;

// =====================================
// Description
// =====================================

export const Description = styled.p`
  max-width: 620px;

  margin: 5px 0 0;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  line-height: 1.5;
`;

// =====================================
// Chart Wrapper
// =====================================

export const ChartWrapper = styled.div`
  width: 100%;

  height: 350px;

  overflow: hidden;

  .recharts-wrapper {
    font-family: inherit;
  }

  .recharts-cartesian-axis-tick-value {
    fill: ${({ theme }) => theme.colors.text.secondary};

    font-size: 12px;
  }

  .recharts-cartesian-axis-line,
  .recharts-cartesian-axis-tick-line {
    stroke: ${({ theme }) => theme.colors.border.default};
  }

  .recharts-cartesian-grid-horizontal line {
    stroke: ${({ theme }) => theme.colors.border.default};

    stroke-opacity: 0.65;
  }

  .recharts-cartesian-grid-vertical line {
    stroke: transparent;
  }

  .recharts-legend-wrapper {
    padding-top: 12px;
  }

  .recharts-legend-item-text {
    color: ${({ theme }) => theme.colors.text.secondary} !important;

    font-size: 12px;
  }

  @media (max-width: 768px) {
    height: 310px;
  }

  @media (max-width: 480px) {
    height: 270px;
  }
`;

// =====================================
// Empty State
// =====================================

export const EmptyState = styled.div`
  min-height: 290px;

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 30px 20px;
`;

// =====================================
// Empty State Content
// =====================================

export const EmptyStateContent = styled.div`
  width: 100%;

  max-width: 380px;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  text-align: center;
`;

// =====================================
// Empty State Icon
// =====================================

export const EmptyStateIcon = styled.div`
  width: 46px;

  height: 46px;

  display: flex;

  align-items: center;

  justify-content: center;

  margin-bottom: 12px;

  border-radius: ${({ theme }) => theme.radius.md};

  background: ${({ theme }) => theme.colors.primary.main}12;

  color: ${({ theme }) => theme.colors.primary.main};

  font-size: 18px;
`;

// =====================================
// Empty State Title
// =====================================

export const EmptyStateTitle = styled.h4`
  margin: 0;

  color: ${({ theme }) => theme.colors.text.primary};

  font-size: ${({ theme }) => theme.typography.sizes.md};

  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

// =====================================
// Empty State Text
// =====================================

export const EmptyStateText = styled.p`
  margin: 6px 0 0;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  line-height: 1.5;
`;

// =====================================
// Tooltip
// =====================================

export const TooltipCard = styled.div`
  min-width: 210px;

  padding: 14px 16px;

  background: ${({ theme }) => theme.colors.surface.default};

  border: 1px solid ${({ theme }) => theme.colors.border.default};

  border-radius: ${({ theme }) => theme.radius.md};

  box-shadow: ${({ theme }) => theme.shadows.md};

  pointer-events: none;
`;

// =====================================
// Tooltip Title
// =====================================

export const TooltipTitle = styled.div`
  margin-bottom: 10px;

  padding-bottom: 9px;

  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};

  color: ${({ theme }) => theme.colors.text.primary};

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  font-weight: ${({ theme }) => theme.typography.weights.bold};
`;

// =====================================
// Tooltip Row
// =====================================

export const TooltipRow = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 20px;

  padding: 5px 0;
`;

// =====================================
// Tooltip Label
// =====================================

export const TooltipLabel = styled.span`
  display: flex;

  align-items: center;

  gap: 7px;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: ${({ theme }) => theme.typography.sizes.xs};

  &::before {
    content: "";

    width: 7px;

    height: 7px;

    flex-shrink: 0;

    border-radius: 50%;

    background: ${({ theme, type }) =>
      type === "income"
        ? theme.colors.status.success
        : type === "expense"
          ? theme.colors.status.danger
          : theme.colors.primary.main};
  }
`;

// =====================================
// Tooltip Value
// =====================================

export const TooltipValue = styled.strong`
  color: ${({ theme }) => theme.colors.text.primary};

  font-size: ${({ theme }) => theme.typography.sizes.xs};

  font-weight: ${({ theme }) => theme.typography.weights.bold};

  white-space: nowrap;
`;

// =====================================
// Tooltip Balance
// =====================================

export const TooltipBalance = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 20px;

  margin-top: 7px;

  padding-top: 9px;

  border-top: 1px solid ${({ theme }) => theme.colors.border.default};
`;

// =====================================
// Tooltip Balance Label
// =====================================

export const TooltipBalanceLabel = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: ${({ theme }) => theme.typography.sizes.xs};

  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

// =====================================
// Tooltip Balance Value
// =====================================

export const TooltipBalanceValue = styled.strong`
  color: ${({ theme, positive }) =>
    positive ? theme.colors.status.success : theme.colors.status.danger};

  font-size: ${({ theme }) => theme.typography.sizes.xs};

  font-weight: ${({ theme }) => theme.typography.weights.bold};

  white-space: nowrap;
`;
