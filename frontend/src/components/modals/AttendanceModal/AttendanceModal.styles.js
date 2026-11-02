import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;

  inset: 0;

  display: flex;

  align-items: center;

  justify-content: center;

  padding: ${({ theme }) => theme.spacing.lg};

  background: rgba(15, 23, 42, 0.45);

  backdrop-filter: blur(8px);

  z-index: ${({ theme }) => theme.zIndex.modal};

  overflow-y: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    align-items: flex-start;

    padding: 12px;
  }
`;

export const ModalContainer = styled.div`
  width: 100%;

  max-width: 720px;

  max-height: 90vh;

  overflow-y: auto;

  background: ${({ theme }) => theme.card.background};

  backdrop-filter: ${({ theme }) => theme.card.backdropFilter};

  border: ${({ theme }) => theme.card.border};

  border-radius: ${({ theme }) => theme.radius.xl};

  box-shadow: ${({ theme }) => theme.shadows.xl};

  animation: modalIn 0.25s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-height: 95vh;

    border-radius: ${({ theme }) => theme.radius.lg};
  }

  @keyframes modalIn {
    from {
      opacity: 0;

      transform: translateY(20px);
    }

    to {
      opacity: 1;

      transform: translateY(0);
    }
  }
`;

export const Header = styled.div`
  display: flex;

  justify-content: space-between;

  align-items: center;

  padding: ${({ theme }) => theme.spacing.xl};

  border-bottom: ${({ theme }) => theme.glass.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.sizes.xl};

  font-weight: ${({ theme }) => theme.typography.weights.bold};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.sizes.lg};
  }
`;

export const CloseButton = styled.button`
  width: 40px;

  height: 40px;

  flex-shrink: 0;

  border: none;

  border-radius: ${({ theme }) => theme.radius.md};

  background: transparent;

  cursor: pointer;

  font-size: 24px;

  &:hover {
    background: rgba(37, 99, 235, 0.08);
  }
`;

export const Form = styled.form`
  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.xl};

  padding: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.md};

    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const Grid = styled.div`
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;

    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const TextArea = styled.textarea`
  width: 100%;

  min-height: 120px;

  resize: none;

  padding: 14px;

  border-radius: ${({ theme }) => theme.radius.md};

  border: ${({ theme }) => theme.glass.border};

  background: ${({ theme }) => theme.card.background};

  color: ${({ theme }) => theme.colors.text.primary};

  outline: none;

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 100px;
  }
`;

export const Footer = styled.div`
  display: flex;

  justify-content: flex-end;

  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column-reverse;

    width: 100%;

    button {
      width: 100%;
    }
  }
`;

export const ErrorMessage = styled.div`
  width: calc(100% - 32px);

  margin: 16px;

  padding: ${({ theme }) => theme.spacing.sm};

  border-radius: ${({ theme }) => theme.radius.md};

  background: rgba(239, 68, 68, 0.1);

  border: 1px solid rgba(239, 68, 68, 0.25);

  color: ${({ theme }) => theme.colors.status.error};

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  text-align: center;
`;
