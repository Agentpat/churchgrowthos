import styled from "styled-components";

export const QuickActionsContainer = styled.section`
  width: 100%;

  margin-top: ${({ theme }) => theme.spacing.xl};
`;

export const SectionTitle = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  font-size: ${({ theme }) => theme.typography.sizes.xl};

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ActionGrid = styled.div`
  display: grid;

  grid-template-columns: 1fr;

  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const ActionCard = styled.button`
  width: 100%;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  gap: ${({ theme }) => theme.spacing.sm};

  padding: ${({ theme }) => theme.spacing.lg};

  border: none;

  cursor: pointer;

  border-radius: ${({ theme }) => theme.radius.xl};

  background: rgba(255, 255, 255, 0.65);

  backdrop-filter: blur(18px);

  border: 1px solid rgba(255, 255, 255, 0.35);

  box-shadow: ${({ theme }) => theme.shadows.md};

  transition: 0.25s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const ActionIcon = styled.div`
  width: 44px;

  height: 44px;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: ${({ theme }) => theme.radius.md};

  background: rgba(37, 99, 235, 0.12);

  color: ${({ theme }) => theme.colors.primary.main};
`;

export const ActionText = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.sm};

  font-weight: ${({ theme }) => theme.typography.weights.medium};

  color: ${({ theme }) => theme.colors.text.primary};
`;
