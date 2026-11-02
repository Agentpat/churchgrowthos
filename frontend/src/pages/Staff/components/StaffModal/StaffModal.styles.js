import styled from "styled-components";

// =====================================
// Overlay
// =====================================

export const Overlay = styled.div`
  position: fixed;

  inset: 0;

  z-index: 1000;

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 24px;

  background: ${({ theme }) =>
    theme.colors?.overlay || "rgba(15, 23, 42, 0.48)"};

  backdrop-filter: blur(3px);

  animation: staffModalOverlayIn 160ms ease-out;

  @keyframes staffModalOverlayIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @media (max-width: 640px) {
    align-items: flex-end;

    padding: 0;
  }
`;

// =====================================
// Modal
// =====================================

export const Modal = styled.div`
  width: 100%;

  max-width: 680px;

  max-height: calc(100vh - 48px);

  overflow: hidden;

  display: flex;

  flex-direction: column;

  border: 1px solid
    ${({ theme }) => theme.colors?.border || "var(--border, #e2e8f0)"};

  border-radius: 14px;

  background: ${({ theme }) =>
    theme.colors?.surface || "var(--surface, #ffffff)"};

  box-shadow: ${({ theme }) =>
    theme.shadows?.lg || "0 24px 70px rgba(15, 23, 42, 0.18)"};

  animation: staffModalIn 180ms ease-out;

  @keyframes staffModalIn {
    from {
      opacity: 0;

      transform: translateY(8px) scale(0.99);
    }

    to {
      opacity: 1;

      transform: translateY(0) scale(1);
    }
  }

  @media (max-width: 640px) {
    max-width: none;

    max-height: 92vh;

    border: 1px solid
      ${({ theme }) => theme.colors?.border || "var(--border, #e2e8f0)"};

    border-bottom: 0;

    border-radius: 14px 14px 0 0;
  }
`;

// =====================================
// Header
// =====================================

export const ModalHeader = styled.div`
  display: flex;

  align-items: flex-start;

  justify-content: space-between;

  gap: 20px;

  padding: 20px 22px;

  border-bottom: 1px solid
    ${({ theme }) => theme.colors?.border || "var(--border, #e2e8f0)"};

  background: ${({ theme }) =>
    theme.colors?.surface || "var(--surface, #ffffff)"};
`;

// =====================================
// Title Wrapper
// =====================================

export const ModalTitleWrapper = styled.div`
  min-width: 0;
`;

// =====================================
// Title
// =====================================

export const ModalTitle = styled.h2`
  margin: 0;

  color: ${({ theme }) =>
    theme.colors?.textPrimary ||
    theme.colors?.text ||
    "var(--text-primary, #111827)"};

  font-size: 17px;

  font-weight: 700;

  line-height: 1.35;
`;

// =====================================
// Description
// =====================================

export const ModalDescription = styled.p`
  margin: 4px 0 0;

  color: ${({ theme }) =>
    theme.colors?.textMuted || "var(--text-muted, #64748b)"};

  font-size: 12px;

  line-height: 1.5;
`;

// =====================================
// Close Button
// =====================================

export const CloseButton = styled.button`
  display: inline-flex;

  align-items: center;

  justify-content: center;

  flex-shrink: 0;

  width: 32px;

  height: 32px;

  padding: 0;

  border: 1px solid
    ${({ theme }) => theme.colors?.border || "var(--border, #e2e8f0)"};

  border-radius: 8px;

  background: ${({ theme }) =>
    theme.colors?.surfaceSubtle || "var(--surface-subtle, #f8fafc)"};

  color: ${({ theme }) =>
    theme.colors?.textMuted || "var(--text-muted, #64748b)"};

  font-family: inherit;

  font-size: 20px;

  font-weight: 400;

  line-height: 1;

  cursor: pointer;

  transition:
    background-color 140ms ease,
    border-color 140ms ease,
    color 140ms ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) =>
      theme.colors?.surfaceHover || "var(--surface-hover, #f1f5f9)"};

    border-color: ${({ theme }) =>
      theme.colors?.borderStrong || "var(--border-strong, #cbd5e1)"};

    color: ${({ theme }) =>
      theme.colors?.textPrimary || "var(--text-primary, #334155)"};
  }

  &:focus-visible {
    outline: none;

    box-shadow: 0 0 0 3px
      ${({ theme }) => theme.colors?.primarySoft || "rgba(37, 99, 235, 0.10)"};
  }

  &:disabled {
    opacity: 0.5;

    cursor: not-allowed;
  }
`;

// =====================================
// Body
// =====================================

export const ModalBody = styled.div`
  flex: 1;

  min-height: 0;

  overflow-y: auto;

  padding: 22px;

  scrollbar-width: thin;

  scrollbar-color: ${({ theme }) => theme.colors?.borderStrong || "#cbd5e1"}
    transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors?.borderStrong || "#cbd5e1"};

    border-radius: 999px;
  }

  @media (max-width: 640px) {
    padding: 18px;
  }
`;
