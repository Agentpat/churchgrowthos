import styled from "styled-components";

export const Container = styled.section`
  width: 100%;

  padding: ${({ theme }) => theme.spacing.lg};

  border-radius: ${({ theme }) => theme.radius.xl};

  background: rgba(255, 255, 255, 0.55);

  backdrop-filter: blur(16px);

  border: 1px solid rgba(255, 255, 255, 0.35);

  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const Title = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.md};

  font-weight: ${({ theme }) => theme.typography.weights.bold};
`;

export const List = styled.div`
  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.sm};
`;

export const InsightItem = styled.div`
  display: flex;

  align-items: flex-start;

  gap: ${({ theme }) => theme.spacing.md};

  padding: ${({ theme }) => theme.spacing.sm};

  border-radius: ${({ theme }) => theme.radius.lg};

  background: rgba(255, 255, 255, 0.45);
`;

export const IconWrapper = styled.div`
  width: 36px;

  height: 36px;

  flex-shrink: 0;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: ${({ theme }) => theme.radius.md};

  background: rgba(37, 99, 235, 0.12);

  color: ${({ theme }) => theme.colors.primary.main};
`;

export const Content = styled.div`
  flex: 1;
`;

export const InsightTitle = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.sm};

  font-weight: ${({ theme }) => theme.typography.weights.medium};

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Description = styled.p`
  margin-top: 3px;

  font-size: ${({ theme }) => theme.typography.sizes.xs};

  color: ${({ theme }) => theme.colors.text.secondary};
`;
