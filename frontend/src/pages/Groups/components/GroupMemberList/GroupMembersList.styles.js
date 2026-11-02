import styled from "styled-components";

// =============================
// Main Container
// =============================

export const Container = styled.section`
  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.lg};

  margin-top: ${({ theme }) => theme.spacing.xl};

  padding: ${({ theme }) => theme.spacing.xl};

  background: ${({ theme }) => theme.glass.background};

  backdrop-filter: ${({ theme }) => theme.glass.blur};

  -webkit-backdrop-filter: ${({ theme }) => theme.glass.blur};

  border: ${({ theme }) => theme.glass.border};

  border-radius: ${({ theme }) => theme.radius.xl};

  box-shadow: ${({ theme }) => theme.glass.shadow};
`;

// =============================
// Header
// =============================

export const Header = styled.div`
  display: flex;

  justify-content: space-between;

  align-items: center;
`;

export const Title = styled.h3`
  margin: 0;

  font-size: ${({ theme }) => theme.typography.sizes.xl};

  font-weight: ${({ theme }) => theme.typography.weights.bold};

  color: ${({ theme }) => theme.colors.text.primary};
`;

// =============================
// Table
// =============================

export const Table = styled.div`
  width: 100%;

  overflow: hidden;

  border-radius: ${({ theme }) => theme.radius.lg};

  border: 1px solid rgba(255, 255, 255, 0.35);
`;

export const Row = styled.div`
  display: grid;

  grid-template-columns:
    2fr
    1.4fr
    1fr
    1fr
    1fr;

  align-items: center;

  padding: 18px 22px;

  background: ${({ $header, theme }) =>
    $header ? "rgba(241,245,249,.7)" : "rgba(255,255,255,.45)"};

  backdrop-filter: blur(12px);

  border-bottom: 1px solid rgba(226, 232, 240, 0.6);

  transition: ${({ theme }) => theme.animation.fast};

  &:hover {
    background: rgba(255, 255, 255, 0.8);

    transform: translateY(-1px);
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;

    gap: 12px;
  }
`;

// =============================
// Cells
// =============================

export const Cell = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};

  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;

export const MemberName = styled.div`
  font-weight: ${({ theme }) => theme.typography.weights.semibold};

  font-size: ${({ theme }) => theme.typography.sizes.md};

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const SubText = styled.div`
  margin-top: 4px;

  font-size: ${({ theme }) => theme.typography.sizes.xs};

  color: ${({ theme }) => theme.colors.text.muted};
`;

// =============================
// Badges
// =============================

export const Badge = styled.span`
  display: inline-flex;

  width: max-content;

  align-items: center;

  padding: 6px 12px;

  border-radius: ${({ theme }) => theme.radius.pill};

  background: rgba(22, 163, 74, 0.12);

  color: ${({ theme }) => theme.colors.status.success};

  font-size: 12px;

  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

export const RoleBadge = styled.span`
  display: inline-flex;

  width: max-content;

  padding: 6px 12px;

  border-radius: ${({ theme }) => theme.radius.pill};

  background: rgba(37, 99, 235, 0.12);

  color: ${({ theme }) => theme.colors.primary.main};

  font-size: 12px;

  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

// =============================
// Empty State
// =============================

export const Empty = styled.div`
  padding: ${({ theme }) => theme.spacing["3xl"]};

  text-align: center;

  color: ${({ theme }) => theme.colors.text.secondary};

  background: rgba(241, 245, 249, 0.55);

  border-radius: ${({ theme }) => theme.radius.lg};
`;

export const RemoveButton = styled.button`
  padding: 6px 12px;

  border-radius: 999px;

  background: rgba(220, 38, 38, 0.12);

  color: #dc2626;

  font-size: 12px;

  font-weight: 600;

  transition: 0.2s ease;

  &:hover {
    background: #dc2626;

    color: white;
  }
`;

export const Count = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const MemberInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Avatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 700;
  font-size: 14px;
`;
