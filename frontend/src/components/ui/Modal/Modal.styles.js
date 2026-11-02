import styled from "styled-components";

// =====================================
// Overlay
// =====================================

export const Overlay = styled.div`
  position: fixed;

  inset: 0;

  z-index: ${({ theme }) => theme.zIndex?.modal || 400};

  display: flex;

  align-items: center;
  justify-content: center;

  padding: 24px;

  background: rgba(15, 23, 42, 0.42);

  backdrop-filter: blur(6px);

  overflow-y: auto;

  -webkit-overflow-scrolling: touch;

  @media (max-width: 640px) {
    align-items: flex-end;

    padding: 0;

    background: rgba(15, 23, 42, 0.46);
  }
`;

// =====================================
// Modal Container
// =====================================

export const ModalContainer = styled.div`
  width: 100%;

  max-width: 760px;

  max-height: min(900px, 92vh);

  display: flex;

  flex-direction: column;

  overflow: hidden;

  background: ${({ theme }) => theme.colors?.surface?.default || "#ffffff"};

  border: 1px solid
    ${({ theme }) => theme.colors?.border?.default || "rgba(15, 23, 42, 0.08)"};

  border-radius: 16px;

  box-shadow:
    0 24px 70px rgba(15, 23, 42, 0.16),
    0 6px 20px rgba(15, 23, 42, 0.08);

  animation: modalIn 180ms ease-out;

  @keyframes modalIn {
    from {
      opacity: 0;

      transform: translateY(12px) scale(0.985);
    }

    to {
      opacity: 1;

      transform: translateY(0) scale(1);
    }
  }

  @media (max-width: 640px) {
    width: 100%;

    max-width: none;

    max-height: 94vh;

    border-radius: 16px 16px 0 0;

    border-bottom: none;

    animation: mobileModalIn 180ms ease-out;

    @keyframes mobileModalIn {
      from {
        opacity: 0;

        transform: translateY(24px);
      }

      to {
        opacity: 1;

        transform: translateY(0);
      }
    }
  }
`;

// =====================================
// Modal Header
// =====================================

export const ModalHeader = styled.div`
  flex-shrink: 0;

  min-height: 58px;

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 16px;

  padding: 0 18px;

  background: ${({ theme }) => theme.colors?.surface?.default || "#ffffff"};

  border-bottom: 1px solid
    ${({ theme }) => theme.colors?.border?.light || "rgba(15, 23, 42, 0.06)"};

  @media (max-width: 640px) {
    min-height: 54px;

    padding: 0 15px;
  }
`;

// =====================================
// Modal Title
// =====================================

export const ModalTitle = styled.h2`
  margin: 0;

  min-width: 0;

  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;

  color: ${({ theme }) => theme.colors?.text?.primary || "#0f172a"};

  font-size: 15px;

  line-height: 1.3;

  font-weight: ${({ theme }) => theme.typography?.weights?.semibold || 650};

  letter-spacing: -0.01em;
`;

// =====================================
// Close Button
// =====================================

export const CloseButton = styled.button`
  width: 30px;

  height: 30px;

  flex: 0 0 30px;

  display: flex;

  align-items: center;
  justify-content: center;

  padding: 0;

  border: 1px solid
    ${({ theme }) => theme.colors?.border?.default || "rgba(15, 23, 42, 0.08)"};

  border-radius: 8px;

  background: ${({ theme }) =>
    theme.colors?.background?.secondary || "#f8fafc"};

  color: ${({ theme }) => theme.colors?.text?.muted || "#94a3b8"};

  cursor: pointer;

  transition:
    background-color 140ms ease,
    border-color 140ms ease,
    color 140ms ease,
    transform 140ms ease;

  svg {
    font-size: 11px;
  }

  &:hover {
    background: rgba(220, 38, 38, 0.07);

    border-color: rgba(220, 38, 38, 0.12);

    color: ${({ theme }) => theme.colors?.status?.danger || "#dc2626"};

    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid rgba(37, 99, 235, 0.2);

    outline-offset: 2px;
  }
`;

// =====================================
// Modal Body
// =====================================

export const ModalBody = styled.div`
  min-width: 0;

  flex: 1;

  overflow-y: auto;

  padding: 18px;

  scrollbar-width: thin;

  scrollbar-color: ${({ theme }) => theme.colors?.border?.default || "#cbd5e1"}
    transparent;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors?.border?.default || "#cbd5e1"};

    border-radius: 999px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors?.text?.muted || "#94a3b8"};
  }

  @media (max-width: 640px) {
    padding: 14px;
  }
`;
