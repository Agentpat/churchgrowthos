import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.xl};

  padding: ${({ theme }) => theme.spacing.xl};

  background: ${({ theme }) => theme.card.background};

  backdrop-filter: ${({ theme }) => theme.card.backdropFilter};

  border: ${({ theme }) => theme.card.border};

  border-radius: ${({ theme }) => theme.radius.xl};

  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

export const Header = styled.div`
  display: flex;

  justify-content: space-between;

  align-items: center;
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.sizes.xl};

  font-weight: ${({ theme }) => theme.typography.weights.bold};

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Grid = styled.div`
  display: grid;

  grid-template-columns: 320px 1fr;

  gap: ${({ theme }) => theme.spacing.xl};

  align-items: flex-start;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const LeftColumn = styled.div`
  display: flex;

  justify-content: center;

  align-items: center;
`;

export const RightColumn = styled.div`
  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.xl};
`;

export const MetricsGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));

  gap: ${({ theme }) => theme.spacing.lg};
`;
