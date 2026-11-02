import styled from "styled-components";

// =====================================
// Main Container
// =====================================

export const OverviewContainer = styled.div`
  display: flex;

  flex-direction: column;

  gap: 24px;

  width: 100%;
`;

// =====================================
// Generic Section
// =====================================

export const Section = styled.section`
  background: ${({ theme }) => theme.colors.surface.default};

  border: 1px solid ${({ theme }) => theme.colors.border.default};

  border-radius: ${({ theme }) => theme.radius.md};

  padding: 20px;

  box-shadow: ${({ theme }) => theme.shadows.xs};
`;

// =====================================
// Section Header
// =====================================

export const SectionHeader = styled.div`
  display: flex;

  align-items: center;

  gap: 12px;

  margin-bottom: 20px;
`;

export const SectionHeaderContent = styled.div`
  min-width: 0;
`;

export const SectionTitle = styled.h2`
  margin: 0;

  font-size: ${({ theme }) => theme.typography.sizes.lg};

  line-height: 1.3;

  font-weight: ${({ theme }) => theme.typography.weights.bold};

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const SectionDescription = styled.span`
  display: block;

  margin-top: 4px;

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const SectionIcon = styled.div`
  width: 38px;

  height: 38px;

  flex-shrink: 0;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: ${({ theme }) => theme.radius.md};

  background: ${({ theme }) => theme.colors.primary.main}12;

  color: ${({ theme }) => theme.colors.primary.main};

  font-size: 16px;
`;

// =====================================
// Financial Position
// =====================================

export const PositionGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(3, minmax(0, 1fr));

  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const PositionCard = styled.div`
  padding: 18px;

  border-radius: ${({ theme }) => theme.radius.md};

  border: 1px solid
    ${({ theme, variant }) => {
      if (variant === "income") {
        return `${theme.colors.status.success}25`;
      }

      if (variant === "expense") {
        return `${theme.colors.status.danger}25`;
      }

      if (variant === "negative") {
        return `${theme.colors.status.danger}25`;
      }

      return `${theme.colors.primary.main}25`;
    }};

  background: ${({ theme, variant }) => {
    if (variant === "income") {
      return `${theme.colors.status.success}0D`;
    }

    if (variant === "expense") {
      return `${theme.colors.status.danger}0D`;
    }

    if (variant === "negative") {
      return `${theme.colors.status.danger}0D`;
    }

    return `${theme.colors.primary.main}0D`;
  }};
`;

export const PositionLabel = styled.div`
  margin-bottom: 8px;
`;

export const IncomePosition = styled.div`
  display: flex;

  align-items: center;

  gap: 8px;

  color: ${({ theme }) => theme.colors.status.success};

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

export const ExpensePosition = styled.div`
  display: flex;

  align-items: center;

  gap: 8px;

  color: ${({ theme }) => theme.colors.status.danger};

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

export const BalancePosition = styled.div`
  display: flex;

  align-items: center;

  gap: 8px;

  color: ${({ theme, positive }) =>
    positive ? theme.colors.primary.main : theme.colors.status.danger};

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

export const PositionValue = styled.strong`
  display: block;

  font-size: 24px;

  line-height: 1.2;

  font-weight: ${({ theme }) => theme.typography.weights.extraBold};

  color: ${({ theme }) => theme.colors.text.primary};

  word-break: break-word;
`;

export const PositionMeta = styled.span`
  display: block;

  margin-top: 6px;

  font-size: ${({ theme }) => theme.typography.sizes.xs};

  color: ${({ theme }) => theme.colors.text.secondary};
`;

// =====================================
// Position Progress
// =====================================

export const ProgressSection = styled.div`
  margin-top: 24px;
`;

export const ProgressLabels = styled.div`
  display: flex;

  justify-content: space-between;

  gap: 16px;

  margin-bottom: 8px;

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const ProgressTrack = styled.div`
  display: flex;

  width: 100%;

  height: 10px;

  overflow: hidden;

  border-radius: 999px;

  background: ${({ theme }) =>
    theme.colors.background?.muted ||
    theme.colors.surface.secondary ||
    theme.colors.border.default};
`;

export const IncomeProgress = styled.div`
  width: ${({ percentage }) => `${percentage}%`};

  background: ${({ theme }) => theme.colors.status.success};

  transition: width 0.3s ease;
`;

export const ExpenseProgress = styled.div`
  width: ${({ percentage }) => `${percentage}%`};

  background: ${({ theme }) => theme.colors.status.danger};

  transition: width 0.3s ease;
`;

// =====================================
// Breakdown
// =====================================

export const BreakdownGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: 24px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

export const BreakdownList = styled.div`
  display: flex;

  flex-direction: column;

  gap: 16px;
`;

export const BreakdownItem = styled.div`
  width: 100%;
`;

export const BreakdownItemHeader = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 16px;

  margin-bottom: 7px;
`;

export const BreakdownItemInfo = styled.div`
  min-width: 0;
`;

export const BreakdownItemTitle = styled.strong`
  display: block;

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const BreakdownItemMeta = styled.span`
  display: block;

  margin-top: 3px;

  font-size: ${({ theme }) => theme.typography.sizes.xs};

  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const BreakdownAmount = styled.strong`
  flex-shrink: 0;

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const BreakdownTrack = styled.div`
  width: 100%;

  height: 6px;

  overflow: hidden;

  border-radius: 999px;

  background: ${({ theme }) => theme.colors.border.default};
`;

export const IncomeBreakdownProgress = styled.div`
  height: 100%;

  width: ${({ percentage }) => `${percentage}%`};

  border-radius: inherit;

  background: ${({ theme }) => theme.colors.status.success};

  transition: width 0.3s ease;
`;

export const ExpenseBreakdownProgress = styled.div`
  height: 100%;

  width: ${({ percentage }) => `${percentage}%`};

  border-radius: inherit;

  background: ${({ theme }) => theme.colors.status.danger};

  transition: width 0.3s ease;
`;

// =====================================
// Payment Methods
// =====================================

export const PaymentGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(4, minmax(0, 1fr));

  gap: 14px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

export const PaymentCard = styled.div`
  padding: 16px;

  border: 1px solid ${({ theme }) => theme.colors.border.default};

  border-radius: ${({ theme }) => theme.radius.md};

  background: ${({ theme }) => theme.colors.surface.default};

  transition: ${({ theme }) => theme.animation.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.light};

    box-shadow: ${({ theme }) => theme.shadows.xs};
  }
`;

export const PaymentMethod = styled.span`
  display: block;

  margin-bottom: 8px;

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const PaymentAmount = styled.strong`
  display: block;

  font-size: 18px;

  font-weight: ${({ theme }) => theme.typography.weights.bold};

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const PaymentTransactions = styled.span`
  display: block;

  margin-top: 4px;

  font-size: ${({ theme }) => theme.typography.sizes.xs};

  color: ${({ theme }) => theme.colors.text.secondary};
`;

// =====================================
// Recent Activity
// =====================================

export const RecentActivityList = styled.div`
  display: flex;

  flex-direction: column;
`;

export const ActivityItem = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 16px;

  padding: 14px 0;

  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 600px) {
    align-items: flex-start;
  }
`;

export const ActivityLeft = styled.div`
  display: flex;

  align-items: center;

  gap: 12px;

  min-width: 0;
`;

export const ActivityIcon = styled.div`
  width: 36px;

  height: 36px;

  flex-shrink: 0;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 50%;

  background: ${({ theme, variant }) =>
    variant === "income"
      ? `${theme.colors.status.success}12`
      : `${theme.colors.status.danger}12`};

  color: ${({ theme, variant }) =>
    variant === "income"
      ? theme.colors.status.success
      : theme.colors.status.danger};
`;

export const ActivityInfo = styled.div`
  min-width: 0;
`;

export const ActivityTitle = styled.strong`
  display: block;

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  color: ${({ theme }) => theme.colors.text.primary};

  white-space: nowrap;

  overflow: hidden;

  text-overflow: ellipsis;
`;

export const ActivityMeta = styled.span`
  display: block;

  margin-top: 3px;

  font-size: ${({ theme }) => theme.typography.sizes.xs};

  color: ${({ theme }) => theme.colors.text.secondary};

  white-space: nowrap;

  overflow: hidden;

  text-overflow: ellipsis;
`;

export const ActivityAmount = styled.strong`
  flex-shrink: 0;

  white-space: nowrap;

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  color: ${({ theme, variant }) =>
    variant === "income"
      ? theme.colors.status.success
      : theme.colors.status.danger};
`;

// =====================================
// Empty State
// =====================================

export const EmptyState = styled.div`
  padding: 30px 20px;

  text-align: center;

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  color: ${({ theme }) => theme.colors.text.secondary};
`;
