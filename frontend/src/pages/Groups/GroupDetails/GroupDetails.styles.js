import styled from "styled-components";

export const Container = styled.div`
  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.xl};
`;

// =============================
// Header Hero Card
// =============================

export const HeaderCard = styled.div`
  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.lg};

  padding: ${({ theme }) => theme.spacing.xl};

  background: ${({ theme }) => theme.glass.background};

  backdrop-filter: ${({ theme }) => theme.glass.blur};

  -webkit-backdrop-filter: ${({ theme }) => theme.glass.blur};

  border: ${({ theme }) => theme.glass.border};

  border-radius: ${({ theme }) => theme.radius.xl};

  box-shadow: ${({ theme }) => theme.glass.shadow};
`;

export const BackButton = styled.button`
  width: max-content;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  transition: ${({ theme }) => theme.animation.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const HeaderTop = styled.div`
  display: flex;

  justify-content: space-between;

  align-items: flex-start;

  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

export const GroupInfo = styled.div`
  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.sm};
`;

export const BadgeRow = styled.div`
  display: flex;

  align-items: center;

  gap: ${({ theme }) => theme.spacing.sm};
`;

export const TypeBadge = styled.span`
  padding: 5px 12px;

  border-radius: ${({ theme }) => theme.radius.pill};

  background: rgba(37, 99, 235, 0.12);

  color: ${({ theme }) => theme.colors.primary.main};

  font-size: 12px;

  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

export const StatusBadge = styled.span`
  padding: 5px 12px;

  border-radius: ${({ theme }) => theme.radius.pill};

  background: rgba(22, 163, 74, 0.12);

  color: ${({ theme }) => theme.colors.status.success};

  font-size: 12px;

  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

export const GroupName = styled.h1`
  margin: 0;

  font-size: ${({ theme }) => theme.typography.sizes["3xl"]};

  font-weight: ${({ theme }) => theme.typography.weights.bold};

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Description = styled.p`
  max-width: 600px;

  color: ${({ theme }) => theme.colors.text.secondary};

  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

export const Meta = styled.p`
  margin-top: ${({ theme }) => theme.spacing.sm};

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;

export const Actions = styled.div`
  display: flex;

  align-items: center;
`;

export const Button = styled.button`
  padding: 12px 20px;

  border-radius: ${({ theme }) => theme.radius.md};

  background: ${({ theme }) => theme.colors.primary.main};

  color: white;

  font-weight: ${({ theme }) => theme.typography.weights.semibold};

  box-shadow: ${({ theme }) => theme.shadows.sm};

  transition: ${({ theme }) => theme.animation.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};

    transform: translateY(-2px);
  }
`;

// =============================
// Statistics
// =============================

export const Stats = styled.div`
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};

  background: ${({ theme }) => theme.glass.background};

  backdrop-filter: ${({ theme }) => theme.glass.blur};

  border: ${({ theme }) => theme.glass.border};

  border-radius: ${({ theme }) => theme.radius.lg};

  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const StatTitle = styled.p`
  margin: 0;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;

export const StatValue = styled.h2`
  margin-top: ${({ theme }) => theme.spacing.sm};

  font-size: ${({ theme }) => theme.typography.sizes["2xl"]};

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Loader = styled.div`
  display: flex;

  justify-content: center;

  align-items: center;

  min-height: 300px;

  color: ${({ theme }) => theme.colors.text.secondary};
`;
