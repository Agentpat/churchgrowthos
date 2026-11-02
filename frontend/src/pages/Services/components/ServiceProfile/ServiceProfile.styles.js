import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;

  inset: 0;

  z-index: ${({ theme }) => theme.zIndex?.modal || 400};

  display: flex;

  justify-content: flex-end;

  background: rgba(15, 23, 42, 0.35);

  backdrop-filter: blur(6px);

  animation: overlayIn 150ms ease;

  @keyframes overlayIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    align-items: flex-end;
  }
`;

export const Panel = styled.div`
  width: 100%;

  max-width: 520px;

  height: 100%;

  display: flex;

  flex-direction: column;

  background: ${({ theme }) => theme.colors.surface.default};

  border-left: 1px solid ${({ theme }) => theme.colors.border.default};

  box-shadow: ${({ theme }) => theme.shadows.xl};

  animation: panelIn 250ms ${({ theme }) => theme.animation.spring};

  @keyframes panelIn {
    from {
      opacity: 0;

      transform: translateX(30px);
    }

    to {
      opacity: 1;

      transform: translateX(0);
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 100%;

    height: 92vh;

    border-left: none;

    border-top: 1px solid ${({ theme }) => theme.colors.border.default};

    border-radius: ${({ theme }) => theme.radius.xl}
      ${({ theme }) => theme.radius.xl} 0 0;

    animation: mobilePanelIn 250ms ${({ theme }) => theme.animation.spring};

    @keyframes mobilePanelIn {
      from {
        opacity: 0;

        transform: translateY(30px);
      }

      to {
        opacity: 1;

        transform: translateY(0);
      }
    }
  }
`;

export const Header = styled.div`
  display: flex;

  align-items: flex-start;

  justify-content: space-between;

  gap: ${({ theme }) => theme.spacing.md};

  padding: ${({ theme }) => theme.spacing.lg};

  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const HeaderContent = styled.div`
  min-width: 0;

  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.xs};
`;

export const Title = styled.h2`
  margin: 0;

  color: ${({ theme }) => theme.colors.text.primary};

  font-size: ${({ theme }) => theme.typography.sizes.xl};

  font-weight: ${({ theme }) => theme.typography.weights.bold};

  line-height: ${({ theme }) => theme.typography.lineHeight.tight};

  word-break: break-word;
`;

export const Type = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;

export const CloseButton = styled.button`
  width: 36px;

  height: 36px;

  flex-shrink: 0;

  display: flex;

  align-items: center;

  justify-content: center;

  border: none;

  border-radius: ${({ theme }) => theme.radius.circle};

  background: ${({ theme }) => theme.colors.background.secondary};

  color: ${({ theme }) => theme.colors.text.secondary};

  cursor: pointer;

  transition: ${({ theme }) => theme.animation.fast};

  &:hover {
    background: rgba(220, 38, 38, 0.08);

    color: ${({ theme }) => theme.colors.status.danger};
  }
`;

export const Body = styled.div`
  flex: 1;

  overflow-y: auto;

  padding: ${({ theme }) => theme.spacing.lg};

  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.lg};

  scrollbar-width: thin;
`;

export const Section = styled.section`
  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.sm};
`;

export const SectionTitle = styled.h3`
  margin: 0;

  color: ${({ theme }) => theme.colors.text.primary};

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

export const InfoGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const InfoItem = styled.div`
  display: flex;

  align-items: center;

  gap: ${({ theme }) => theme.spacing.sm};

  padding: ${({ theme }) => theme.spacing.sm};

  border: 1px solid ${({ theme }) => theme.colors.border.light};

  border-radius: ${({ theme }) => theme.radius.md};

  background: ${({ theme }) => theme.colors.background.main};
`;

export const InfoIcon = styled.div`
  width: 34px;

  height: 34px;

  flex-shrink: 0;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: ${({ theme }) => theme.radius.md};

  background: rgba(37, 99, 235, 0.08);

  color: ${({ theme }) => theme.colors.primary.main};

  font-size: 14px;
`;

export const InfoContent = styled.div`
  min-width: 0;

  display: flex;

  flex-direction: column;

  gap: 2px;
`;

export const InfoLabel = styled.span`
  color: ${({ theme }) => theme.colors.text.muted};

  font-size: ${({ theme }) => theme.typography.sizes.xs};
`;

export const InfoValue = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  font-weight: ${({ theme }) => theme.typography.weights.medium};

  word-break: break-word;
`;

export const Description = styled.p`
  margin: 0;

  padding: ${({ theme }) => theme.spacing.md};

  border-radius: ${({ theme }) => theme.radius.md};

  background: ${({ theme }) => theme.colors.background.main};

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
`;

export const StatsGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(4, minmax(0, 1fr));

  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const Stat = styled.div`
  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  gap: 4px;

  min-height: 78px;

  padding: ${({ theme }) => theme.spacing.sm};

  border: 1px solid ${({ theme }) => theme.colors.border.light};

  border-radius: ${({ theme }) => theme.radius.md};

  background: ${({ theme }) => theme.colors.background.main};

  color: ${({ theme }) => theme.colors.primary.main};

  font-size: 14px;
`;

export const StatValue = styled.strong`
  color: ${({ theme }) => theme.colors.text.primary};

  font-size: ${({ theme }) => theme.typography.sizes.lg};

  font-weight: ${({ theme }) => theme.typography.weights.bold};
`;

export const StatLabel = styled.span`
  color: ${({ theme }) => theme.colors.text.muted};

  font-size: ${({ theme }) => theme.typography.sizes.xs};
`;

export const Notes = styled.div`
  padding: ${({ theme }) => theme.spacing.md};

  border-left: 3px solid ${({ theme }) => theme.colors.primary.main};

  background: ${({ theme }) => theme.colors.background.main};

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  line-height: ${({ theme }) => theme.typography.lineHeight.normal};

  white-space: pre-wrap;
`;

export const Footer = styled.div`
  display: flex;

  justify-content: flex-end;

  align-items: center;

  gap: ${({ theme }) => theme.spacing.sm};

  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};

  border-top: 1px solid ${({ theme }) => theme.colors.border.light};

  background: ${({ theme }) => theme.colors.surface.default};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.md};

    & > button {
      flex: 1;
    }
  }
`;
