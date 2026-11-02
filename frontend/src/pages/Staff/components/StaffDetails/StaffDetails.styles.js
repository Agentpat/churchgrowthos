import styled from "styled-components";

// =====================================
// Overlay
// =====================================

export const Overlay = styled.div`
  position: fixed;

  inset: 0;

  z-index: 1100;

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 24px;

  background: ${({ theme }) =>
    theme.colors?.overlay || "rgba(15, 23, 42, 0.68)"};

  backdrop-filter: blur(4px);

  -webkit-backdrop-filter: blur(4px);

  animation: staffDetailsOverlayIn 160ms ease-out;

  @keyframes staffDetailsOverlayIn {
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

  background: ${({ theme }) => theme.colors?.surface || "#ffffff"};

  box-shadow:
    0 24px 70px rgba(15, 23, 42, 0.22),
    0 8px 24px rgba(15, 23, 42, 0.08);

  animation: staffDetailsModalIn 180ms ease-out;

  @keyframes staffDetailsModalIn {
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

  background: ${({ theme }) => theme.colors?.surface || "#ffffff"};

  flex-shrink: 0;
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

// =====================================
// Profile Header
// =====================================

export const ProfileHeader = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 16px;

  padding: 16px;

  margin-bottom: 22px;

  border: 1px solid
    ${({ theme }) => theme.colors?.border || "var(--border, #e2e8f0)"};

  border-radius: 11px;

  background: ${({ theme }) =>
    theme.colors?.surfaceSubtle || "var(--surface-subtle, #f8fafc)"};

  @media (max-width: 560px) {
    align-items: flex-start;

    flex-direction: column;
  }
`;

// =====================================
// Profile Identity
// =====================================

export const ProfileIdentity = styled.div`
  min-width: 0;

  display: flex;

  flex-direction: column;

  gap: 3px;
`;

// =====================================
// Profile Name
// =====================================

export const ProfileName = styled.h3`
  margin: 0;

  color: ${({ theme }) =>
    theme.colors?.textPrimary ||
    theme.colors?.text ||
    "var(--text-primary, #111827)"};

  font-size: 18px;

  font-weight: 700;

  line-height: 1.35;
`;

// =====================================
// Profile Role
// =====================================

export const ProfileRole = styled.span`
  color: ${({ theme }) =>
    theme.colors?.textSecondary || "var(--text-secondary, #64748b)"};

  font-size: 13px;

  line-height: 1.4;
`;

// =====================================
// Status Badge
// =====================================

export const StatusBadge = styled.span`
  display: inline-flex;

  align-items: center;

  justify-content: center;

  min-height: 27px;

  padding: 0 10px;

  flex-shrink: 0;

  border-radius: 999px;

  background: ${({ $active, theme }) =>
    $active
      ? theme.colors?.successSoft || "rgba(22, 163, 74, 0.10)"
      : theme.colors?.surfaceSubtle || "var(--surface-subtle, #f1f5f9)"};

  color: ${({ $active, theme }) =>
    $active
      ? theme.colors?.success || "#15803d"
      : theme.colors?.textMuted || "var(--text-muted, #64748b)"};

  font-size: 11px;

  font-weight: 650;

  line-height: 1;
`;

// =====================================
// Section
// =====================================

export const Section = styled.section`
  margin-bottom: 22px;

  &:last-child {
    margin-bottom: 0;
  }
`;

// =====================================
// Section Title
// =====================================

export const SectionTitle = styled.h4`
  margin: 0 0 12px;

  color: ${({ theme }) =>
    theme.colors?.textPrimary ||
    theme.colors?.text ||
    "var(--text-primary, #1e293b)"};

  font-size: 12px;

  font-weight: 700;

  line-height: 1.4;

  letter-spacing: 0.04em;

  text-transform: uppercase;
`;

// =====================================
// Info Grid
// =====================================

export const InfoGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: 14px 20px;

  padding: 16px;

  border: 1px solid
    ${({ theme }) => theme.colors?.border || "var(--border, #e2e8f0)"};

  border-radius: 10px;

  background: ${({ theme }) => theme.colors?.surface || "#ffffff"};

  @media (max-width: 560px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

// =====================================
// Info Item
// =====================================

export const InfoItem = styled.div`
  min-width: 0;

  display: flex;

  flex-direction: column;

  gap: 4px;
`;

// =====================================
// Info Label
// =====================================

export const InfoLabel = styled.span`
  color: ${({ theme }) =>
    theme.colors?.textMuted || "var(--text-muted, #94a3b8)"};

  font-size: 11px;

  font-weight: 600;

  line-height: 1.4;

  text-transform: uppercase;

  letter-spacing: 0.03em;
`;

// =====================================
// Info Value
// =====================================

export const InfoValue = styled.span`
  min-width: 0;

  overflow: hidden;

  color: ${({ theme }) =>
    theme.colors?.textPrimary ||
    theme.colors?.text ||
    "var(--text-primary, #334155)"};

  font-size: 13px;

  font-weight: 500;

  line-height: 1.5;

  overflow-wrap: anywhere;
`;

// =====================================
// Service Areas
// =====================================

export const ServiceAreas = styled.div`
  display: flex;

  align-items: center;

  flex-wrap: wrap;

  gap: 7px;

  margin-top: 2px;
`;

// =====================================
// Service Area Badge
// =====================================

export const ServiceAreaBadge = styled.span`
  display: inline-flex;

  align-items: center;

  min-height: 27px;

  padding: 0 9px;

  border: 1px solid
    ${({ theme }) => theme.colors?.border || "var(--border, #e2e8f0)"};

  border-radius: 999px;

  background: ${({ theme }) =>
    theme.colors?.surfaceSubtle || "var(--surface-subtle, #f8fafc)"};

  color: ${({ theme }) =>
    theme.colors?.textSecondary || "var(--text-secondary, #475569)"};

  font-size: 11px;

  font-weight: 600;

  line-height: 1;
`;

// =====================================
// Notes Box
// =====================================

export const NotesBox = styled.div`
  padding: 14px 16px;

  border: 1px solid
    ${({ theme }) => theme.colors?.border || "var(--border, #e2e8f0)"};

  border-radius: 10px;

  background: ${({ theme }) =>
    theme.colors?.surfaceSubtle || "var(--surface-subtle, #f8fafc)"};
`;

// =====================================
// Notes Text
// =====================================

export const NotesText = styled.p`
  margin: 0;

  color: ${({ theme }) =>
    theme.colors?.textSecondary || "var(--text-secondary, #64748b)"};

  font-size: 13px;

  line-height: 1.6;

  white-space: pre-wrap;

  overflow-wrap: anywhere;
`;

// =====================================
// Access Card
// =====================================

export const AccessCard = styled.div`
  padding: 15px 16px;

  border: 1px solid
    ${({ theme }) => theme.colors?.border || "var(--border, #e2e8f0)"};

  border-radius: 10px;

  background: ${({ theme }) => theme.colors?.surface || "#ffffff"};
`;

// =====================================
// Access Status
// =====================================

export const AccessStatus = styled.div`
  display: flex;

  align-items: center;

  gap: 8px;
`;

// =====================================
// Access Status Dot
// =====================================

export const AccessStatusDot = styled.span`
  width: 8px;

  height: 8px;

  flex-shrink: 0;

  border-radius: 50%;

  background: ${({ $connected, theme }) =>
    $connected
      ? theme.colors?.success || "#16a34a"
      : theme.colors?.textMuted || "#94a3b8"};
`;

// =====================================
// Access Title
// =====================================

export const AccessTitle = styled.span`
  color: ${({ theme }) =>
    theme.colors?.textPrimary ||
    theme.colors?.text ||
    "var(--text-primary, #334155)"};

  font-size: 13px;

  font-weight: 650;

  line-height: 1.4;
`;

// =====================================
// Access Description
// =====================================

export const AccessDescription = styled.p`
  margin: 7px 0 0 16px;

  color: ${({ theme }) =>
    theme.colors?.textMuted || "var(--text-muted, #64748b)"};

  font-size: 12px;

  line-height: 1.55;
`;

// =====================================
// Modal Footer
// =====================================

export const ModalFooter = styled.div`
  display: flex;

  align-items: center;

  justify-content: flex-end;

  gap: 8px;

  padding: 14px 22px;

  border-top: 1px solid
    ${({ theme }) => theme.colors?.border || "var(--border, #e2e8f0)"};

  background: ${({ theme }) => theme.colors?.surface || "#ffffff"};

  flex-shrink: 0;

  @media (max-width: 640px) {
    padding: 14px 18px;
  }
`;

// =====================================
// Close Action
// =====================================

export const CloseAction = styled.button`
  display: inline-flex;

  align-items: center;

  justify-content: center;

  min-height: 38px;

  padding: 0 15px;

  border: 1px solid
    ${({ theme }) => theme.colors?.border || "var(--border, #cbd5e1)"};

  border-radius: 8px;

  background: ${({ theme }) => theme.colors?.surface || "#ffffff"};

  color: ${({ theme }) =>
    theme.colors?.textSecondary || "var(--text-secondary, #475569)"};

  font-family: inherit;

  font-size: 13px;

  font-weight: 600;

  cursor: pointer;

  transition:
    background-color 140ms ease,
    border-color 140ms ease,
    color 140ms ease;

  &:hover {
    background: ${({ theme }) =>
      theme.colors?.surfaceHover || "var(--surface-hover, #f8fafc)"};

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
`;
