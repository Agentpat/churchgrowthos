import styled from "styled-components";

export const Container = styled.section`
  width: 100%;

  padding: ${({ theme }) => theme.spacing.lg};

  border-radius: ${({ theme }) => theme.radius.xl};

  background: rgba(255, 255, 255, 0.65);

  backdrop-filter: blur(18px);

  -webkit-backdrop-filter: blur(18px);

  border: 1px solid rgba(255, 255, 255, 0.35);

  box-shadow: ${({ theme }) => theme.shadows.md};
`;

export const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.sizes.lg};

  font-weight: ${({ theme }) => theme.typography.weights.bold};

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const MetricGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: ${({ theme }) => theme.spacing.sm};

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const MetricCard = styled.div`
  display: flex;

  align-items: center;

  gap: ${({ theme }) => theme.spacing.sm};

  padding: ${({ theme }) => theme.spacing.sm};

  min-height: 78px;

  border-radius: ${({ theme }) => theme.radius.lg};

  background: rgba(255, 255, 255, 0.55);

  border: 1px solid rgba(255, 255, 255, 0.35);

  transition: ${({ theme }) => theme.animation.fast};

  &:hover {
    transform: translateY(-2px);

    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
`;

export const IconWrapper = styled.div`
  width: 34px;

  height: 34px;

  display: flex;

  align-items: center;

  justify-content: center;

  flex-shrink: 0;

  border-radius: ${({ theme }) => theme.radius.md};

  background: rgba(37, 99, 235, 0.12);

  color: ${({ theme }) => theme.colors.primary.main};
`;

export const Content = styled.div`
  min-width: 0;
`;

export const Label = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.xs};

  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Value = styled.h3`
  margin-top: 2px;

  font-size: ${({ theme }) => theme.typography.sizes.lg};

  font-weight: ${({ theme }) => theme.typography.weights.bold};

  line-height: 1;

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Description = styled.span`
  display: block;

  margin-top: 3px;

  font-size: ${({ theme }) => theme.typography.sizes.xs};

  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const TrendContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};

  padding: ${({ theme }) => theme.spacing.md};

  border-radius: ${({ theme }) => theme.radius.lg};

  background: rgba(255, 255, 255, 0.5);

  border: 1px solid rgba(255, 255, 255, 0.3);
`;

export const TrendHeader = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const TrendTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.sm};

  font-weight: ${({ theme }) => theme.typography.weights.bold};

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const TrendPeriod = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.xs};

  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const GrowthBadge = styled.span`
  margin-left: ${({ theme }) => theme.spacing.sm};

  padding: 4px 10px;

  border-radius: 999px;

  background: rgba(34, 197, 94, 0.12);

  color: rgb(22, 163, 74);

  font-size: ${({ theme }) => theme.typography.sizes.xs};

  font-weight: ${({ theme }) => theme.typography.weights.medium};
`;
