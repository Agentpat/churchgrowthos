import styled from "styled-components";

export const Container = styled.section`
  width: 100%;

  margin-top: ${({ theme }) => theme.spacing.xxl};

  padding: ${({ theme }) => theme.spacing.lg};

  border-radius: ${({ theme }) => theme.radius.xl};

  background: rgba(255, 255, 255, 0.45);

  backdrop-filter: blur(18px);

  -webkit-backdrop-filter: blur(18px);

  border: 1px solid rgba(255, 255, 255, 0.35);

  box-shadow: ${({ theme }) => theme.shadows.md};
`;

export const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.sizes.xl};

  font-weight: ${({ theme }) => theme.typography.weights.bold};

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Subtitle = styled.p`
  margin-top: ${({ theme }) => theme.spacing.sm};

  max-width: 600px;

  line-height: 1.6;

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const MetricsGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: ${({ theme }) => theme.spacing.md};

  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const ContentGrid = styled.div`
  display: grid;

  grid-template-columns: 1fr;

  gap: ${({ theme }) => theme.spacing.xl};

  margin-top: ${({ theme }) => theme.spacing.lg};

  @media (min-width: 1024px) {
    grid-template-columns: 1.8fr 1fr;

    align-items: start;
  }
`;

export const LeftColumn = styled.div`
  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.lg};
`;

export const RightColumn = styled.div`
  display: flex;

  flex-direction: column;
`;
