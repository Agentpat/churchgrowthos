import styled from "styled-components";

// =====================================
// Page
// =====================================

export const Page = styled.div`
  width: 100%;
  min-height: 100%;
  background: ${({ theme }) =>
    theme.colors?.background || "var(--background, #f8fafc)"};
`;

// =====================================
// Page Container
// =====================================

export const PageContainer = styled.div`
  width: 100%;
  max-width: 1440px;

  margin: 0 auto;

  padding: 28px 32px 40px;

  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding: 24px 24px 36px;
  }

  @media (max-width: 768px) {
    padding: 20px 18px 32px;
  }

  @media (max-width: 480px) {
    padding: 18px 14px 28px;
  }
`;

// =====================================
// Page Header
// =====================================

export const PageHeader = styled.div`
  display: flex;

  align-items: flex-start;

  justify-content: space-between;

  gap: 24px;

  margin-bottom: 24px;

  @media (max-width: 640px) {
    flex-direction: column;

    align-items: stretch;

    gap: 16px;
  }
`;

// =====================================
// Header Content
// =====================================

export const HeaderContent = styled.div`
  min-width: 0;
`;

// =====================================
// Title
// =====================================

export const Title = styled.h1`
  margin: 0;

  color: ${({ theme }) =>
    theme.colors?.textPrimary ||
    theme.colors?.text ||
    "var(--text-primary, #111827)"};

  font-size: 26px;

  font-weight: 700;

  line-height: 1.25;

  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 23px;
  }
`;

// =====================================
// Description
// =====================================

export const Description = styled.p`
  margin: 7px 0 0;

  max-width: 620px;

  color: ${({ theme }) =>
    theme.colors?.textSecondary || "var(--text-secondary, #64748b)"};

  font-size: 13px;

  line-height: 1.55;
`;

// =====================================
// Header Actions
// =====================================

export const HeaderActions = styled.div`
  display: flex;

  align-items: center;

  justify-content: flex-end;

  gap: 10px;

  flex-shrink: 0;

  @media (max-width: 640px) {
    width: 100%;

    justify-content: stretch;
  }
`;

// =====================================
// Primary Button
// =====================================

export const PrimaryButton = styled.button`
  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 7px;

  min-height: 42px;

  padding: 0 16px;

  box-sizing: border-box;

  border: 1px solid #2563eb;

  border-radius: 9px;

  background: #2563eb;

  color: #ffffff;

  font-family: inherit;

  font-size: 13px;

  font-weight: 600;

  line-height: 1;

  white-space: nowrap;

  cursor: pointer;

  appearance: none;

  -webkit-appearance: none;

  transition:
    background-color 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease,
    transform 160ms ease;

  &:hover:not(:disabled) {
    background: #1d4ed8;

    border-color: #1d4ed8;

    color: #ffffff;

    box-shadow: 0 5px 14px rgba(37, 99, 235, 0.16);
  }

  &:active:not(:disabled) {
    transform: translateY(1px);

    box-shadow: none;
  }

  &:focus-visible {
    outline: none;

    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
  }

  &:disabled {
    opacity: 0.55;

    cursor: not-allowed;

    box-shadow: none;
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`;

// =====================================
// Secondary Button
// =====================================

export const SecondaryButton = styled.button`
  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 7px;

  min-height: 42px;

  padding: 0 15px;

  box-sizing: border-box;

  border: 1px solid
    ${({ theme }) => theme.colors?.border || "var(--border, #cbd5e1)"};

  border-radius: 9px;

  background: ${({ theme }) =>
    theme.colors?.surface || "var(--surface, #ffffff)"};

  color: ${({ theme }) =>
    theme.colors?.textSecondary || "var(--text-secondary, #64748b)"};

  font-family: inherit;

  font-size: 13px;

  font-weight: 600;

  cursor: pointer;

  appearance: none;

  -webkit-appearance: none;

  transition:
    background-color 160ms ease,
    border-color 160ms ease,
    color 160ms ease,
    box-shadow 160ms ease;

  &:hover:not(:disabled) {
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

  &:disabled {
    opacity: 0.55;

    cursor: not-allowed;
  }
`;

// =====================================
// Content Card
// =====================================

export const ContentCard = styled.section`
  overflow: hidden;

  border: 1px solid
    ${({ theme }) => theme.colors?.border || "var(--border, #e2e8f0)"};

  border-radius: 12px;

  background: ${({ theme }) =>
    theme.colors?.surface || "var(--surface, #ffffff)"};

  box-shadow: ${({ theme }) =>
    theme.shadows?.sm || "0 1px 3px rgba(15, 23, 42, 0.05)"};
`;

// =====================================
// Content Header
// =====================================

export const ContentHeader = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 20px;

  padding: 20px 22px;

  border-bottom: 1px solid
    ${({ theme }) => theme.colors?.border || "var(--border, #e2e8f0)"};

  @media (max-width: 640px) {
    padding: 18px;
  }
`;

// =====================================
// Content Header Text
// =====================================

export const ContentHeaderText = styled.div`
  min-width: 0;
`;

// =====================================
// Section Title
// =====================================

export const SectionTitle = styled.h2`
  margin: 0;

  color: ${({ theme }) =>
    theme.colors?.textPrimary ||
    theme.colors?.text ||
    "var(--text-primary, #111827)"};

  font-size: 16px;

  font-weight: 700;

  line-height: 1.4;
`;

// =====================================
// Section Description
// =====================================

export const SectionDescription = styled.p`
  margin: 4px 0 0;

  color: ${({ theme }) =>
    theme.colors?.textMuted || "var(--text-muted, #64748b)"};

  font-size: 12px;

  line-height: 1.5;
`;

// =====================================
// Empty State
// =====================================

export const EmptyState = styled.div`
  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  min-height: 260px;

  padding: 40px 24px;

  text-align: center;
`;

// =====================================
// Empty State Title
// =====================================

export const EmptyStateTitle = styled.h3`
  margin: 0;

  color: ${({ theme }) =>
    theme.colors?.textPrimary || "var(--text-primary, #111827)"};

  font-size: 15px;

  font-weight: 700;
`;

// =====================================
// Empty State Text
// =====================================

export const EmptyStateText = styled.p`
  max-width: 420px;

  margin: 7px 0 0;

  color: ${({ theme }) =>
    theme.colors?.textMuted || "var(--text-muted, #64748b)"};

  font-size: 13px;

  line-height: 1.55;
`;

// =====================================
// Loading State
// =====================================

export const LoadingState = styled.div`
  display: flex;

  align-items: center;

  justify-content: center;

  min-height: 240px;

  padding: 30px;

  color: ${({ theme }) =>
    theme.colors?.textMuted || "var(--text-muted, #64748b)"};

  font-size: 13px;
`;

// =====================================
// Error State
// =====================================

export const ErrorState = styled.div`
  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  min-height: 240px;

  padding: 30px;

  text-align: center;
`;

// =====================================
// Error Text
// =====================================

export const ErrorText = styled.p`
  max-width: 520px;

  margin: 0 0 16px;

  color: ${({ theme }) => theme.colors?.danger || "var(--danger, #dc2626)"};

  font-size: 13px;

  line-height: 1.55;
`;

// =====================================
// Pagination
// =====================================

export const Pagination = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 16px;

  padding: 16px 22px;

  border-top: 1px solid
    ${({ theme }) => theme.colors?.border || "var(--border, #e2e8f0)"};

  @media (max-width: 560px) {
    flex-direction: column;

    align-items: stretch;
  }
`;

// =====================================
// Pagination Info
// =====================================

export const PaginationInfo = styled.span`
  color: ${({ theme }) =>
    theme.colors?.textMuted || "var(--text-muted, #64748b)"};

  font-size: 12px;

  font-weight: 500;
`;

// =====================================
// Pagination Actions
// =====================================

export const PaginationActions = styled.div`
  display: flex;

  align-items: center;

  gap: 8px;
`;

// =====================================
// Pagination Button
// =====================================

export const PaginationButton = styled.button`
  min-height: 36px;

  padding: 0 12px;

  border: 1px solid
    ${({ theme }) => theme.colors?.border || "var(--border, #cbd5e1)"};

  border-radius: 8px;

  background: ${({ theme }) =>
    theme.colors?.surface || "var(--surface, #ffffff)"};

  color: ${({ theme }) =>
    theme.colors?.textSecondary || "var(--text-secondary, #64748b)"};

  font-family: inherit;

  font-size: 12px;

  font-weight: 600;

  cursor: pointer;

  transition:
    background-color 140ms ease,
    border-color 140ms ease,
    color 140ms ease;

  &:hover:not(:disabled) {
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

  &:disabled {
    opacity: 0.45;

    cursor: not-allowed;
  }
`;
