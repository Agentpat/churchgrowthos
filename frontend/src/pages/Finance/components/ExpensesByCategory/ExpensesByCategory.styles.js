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
  max-width: 600px;

  margin: 5px 0 0;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  line-height: 1.5;
`;

// =====================================
// Content
// =====================================

export const Content = styled.div`
  width: 100%;
`;

// =====================================
// Breakdown List
// =====================================

export const BreakdownList = styled.div`
  display: flex;

  flex-direction: column;

  gap: 18px;
`;

// =====================================
// Breakdown Item
// =====================================

export const BreakdownItem = styled.div`
  width: 100%;
`;

// =====================================
// Item Header
// =====================================

export const ItemHeader = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 16px;

  margin-bottom: 9px;
`;

// =====================================
// Item Info
// =====================================

export const ItemInfo = styled.div`
  display: flex;

  align-items: center;

  min-width: 0;

  gap: 11px;
`;

// =====================================
// Item Icon
// =====================================

export const ItemIcon = styled.div`
  width: 36px;

  height: 36px;

  flex-shrink: 0;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 10px;

  background: ${({ theme }) => theme.colors.status.danger}12;

  color: ${({ theme }) => theme.colors.status.danger};

  font-size: 14px;
`;

// =====================================
// Item Details
// =====================================

export const ItemDetails = styled.div`
  min-width: 0;
`;

// =====================================
// Item Name
// =====================================

export const ItemName = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  font-weight: ${({ theme }) => theme.typography.weights.semibold};

  white-space: nowrap;

  overflow: hidden;

  text-overflow: ellipsis;
`;

// =====================================
// Item Transactions
// =====================================

export const ItemTransactions = styled.div`
  margin-top: 2px;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: ${({ theme }) => theme.typography.sizes.xs};
`;

// =====================================
// Item Amount
// =====================================

export const ItemAmount = styled.strong`
  flex-shrink: 0;

  color: ${({ theme }) => theme.colors.text.primary};

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  font-weight: ${({ theme }) => theme.typography.weights.bold};

  white-space: nowrap;
`;

// =====================================
// Progress Track
// =====================================

export const ProgressTrack = styled.div`
  width: 100%;

  height: 7px;

  overflow: hidden;

  border-radius: 999px;

  background: ${({ theme }) => theme.colors.border.default};
`;

// =====================================
// Progress Bar
// =====================================

export const ProgressBar = styled.div`
  width: ${({ percentage }) =>
    `${Math.min(Math.max(Number(percentage) || 0, 0), 100)}%`};

  height: 100%;

  border-radius: inherit;

  background: ${({ theme }) => theme.colors.status.danger};

  transition: width 350ms ease;
`;

// =====================================
// Empty State
// =====================================

export const EmptyState = styled.div`
  min-height: 220px;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  text-align: center;

  padding: 30px 20px;
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

  background: ${({ theme }) => theme.colors.status.danger}12;

  color: ${({ theme }) => theme.colors.status.danger};

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
  max-width: 360px;

  margin: 6px 0 0;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  line-height: 1.5;
`;
