import styled from "styled-components";

// =====================================
// Filters Container
// =====================================

export const FiltersContainer = styled.div`
  display: flex;

  align-items: center;

  gap: 10px;

  flex-wrap: wrap;

  padding: 16px 22px;

  border-bottom: 1px solid
    ${({ theme }) => theme.colors?.border || "var(--border, #e2e8f0)"};

  background: ${({ theme }) =>
    theme.colors?.surfaceSubtle || "var(--surface-subtle, #fafafa)"};

  @media (max-width: 768px) {
    padding: 14px 18px;
  }

  @media (max-width: 560px) {
    flex-direction: column;

    align-items: stretch;

    gap: 10px;
  }
`;

// =====================================
// Search Wrapper
// =====================================

export const SearchWrapper = styled.div`
  position: relative;

  flex: 1;

  min-width: 220px;

  @media (max-width: 768px) {
    min-width: 180px;
  }

  @media (max-width: 560px) {
    width: 100%;

    min-width: 0;
  }
`;

// =====================================
// Search Icon
// =====================================

export const SearchIcon = styled.span`
  position: absolute;

  top: 50%;

  left: 12px;

  display: flex;

  align-items: center;

  justify-content: center;

  width: 18px;

  height: 18px;

  color: ${({ theme }) =>
    theme.colors?.textMuted || "var(--text-muted, #94a3b8)"};

  font-size: 19px;

  line-height: 1;

  pointer-events: none;

  transform: translateY(-50%);
`;

// =====================================
// Search Input
// =====================================

export const SearchInput = styled.input`
  width: 100%;

  min-height: 40px;

  box-sizing: border-box;

  padding: 0 12px 0 36px;

  border: 1px solid
    ${({ theme }) => theme.colors?.border || "var(--border, #cbd5e1)"};

  border-radius: 9px;

  outline: none;

  background: ${({ theme }) =>
    theme.colors?.surface || "var(--surface, #ffffff)"};

  color: ${({ theme }) =>
    theme.colors?.textPrimary ||
    theme.colors?.text ||
    "var(--text-primary, #111827)"};

  font-family: inherit;

  font-size: 13px;

  transition:
    border-color 160ms ease,
    box-shadow 160ms ease,
    background-color 160ms ease;

  &::placeholder {
    color: ${({ theme }) =>
      theme.colors?.textMuted || "var(--text-muted, #94a3b8)"};
  }

  &:hover {
    border-color: ${({ theme }) =>
      theme.colors?.borderStrong || "var(--border-strong, #cbd5e1)"};
  }

  &:focus {
    border-color: ${({ theme }) =>
      theme.colors?.primary || "var(--primary, #2563eb)"};

    box-shadow: 0 0 0 3px
      ${({ theme }) => theme.colors?.primarySoft || "rgba(37, 99, 235, 0.10)"};
  }

  &:focus-visible {
    outline: none;
  }

  &:disabled {
    opacity: 0.6;

    cursor: not-allowed;

    background: ${({ theme }) =>
      theme.colors?.surfaceSubtle || "var(--surface-subtle, #f8fafc)"};
  }
`;

// =====================================
// Select Wrapper
// =====================================

export const SelectWrapper = styled.div`
  width: 155px;

  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 145px;
  }

  @media (max-width: 560px) {
    width: 100%;
  }
`;

// =====================================
// Select
// =====================================

export const Select = styled.select`
  width: 100%;

  min-height: 40px;

  box-sizing: border-box;

  padding: 0 32px 0 12px;

  border: 1px solid
    ${({ theme }) => theme.colors?.border || "var(--border, #cbd5e1)"};

  border-radius: 9px;

  outline: none;

  background: ${({ theme }) =>
    theme.colors?.surface || "var(--surface, #ffffff)"};

  color: ${({ theme }) =>
    theme.colors?.textPrimary ||
    theme.colors?.text ||
    "var(--text-primary, #111827)"};

  font-family: inherit;

  font-size: 13px;

  cursor: pointer;

  transition:
    border-color 160ms ease,
    box-shadow 160ms ease,
    background-color 160ms ease;

  &:hover {
    border-color: ${({ theme }) =>
      theme.colors?.borderStrong || "var(--border-strong, #cbd5e1)"};
  }

  &:focus {
    border-color: ${({ theme }) =>
      theme.colors?.primary || "var(--primary, #2563eb)"};

    box-shadow: 0 0 0 3px
      ${({ theme }) => theme.colors?.primarySoft || "rgba(37, 99, 235, 0.10)"};
  }

  &:focus-visible {
    outline: none;
  }

  &:disabled {
    opacity: 0.6;

    cursor: not-allowed;

    background: ${({ theme }) =>
      theme.colors?.surfaceSubtle || "var(--surface-subtle, #f8fafc)"};
  }
`;

// =====================================
// Filter Actions
// =====================================

export const FilterActions = styled.div`
  display: flex;

  align-items: center;

  gap: 8px;

  flex-shrink: 0;

  @media (max-width: 560px) {
    width: 100%;
  }
`;

// =====================================
// Search Button
// =====================================

export const SearchButton = styled.button`
  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 7px;

  min-height: 40px;

  padding: 0 15px;

  border: 1px solid
    ${({ theme }) => theme.colors?.primary || "var(--primary, #2563eb)"};

  border-radius: 9px;

  background: ${({ theme }) =>
    theme.colors?.primary || "var(--primary, #2563eb)"};

  color: ${({ theme }) => theme.colors?.primaryContrast || "#ffffff"};

  font-family: inherit;

  font-size: 13px;

  font-weight: 600;

  white-space: nowrap;

  cursor: pointer;

  transition:
    background-color 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease,
    transform 160ms ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) =>
      theme.colors?.primaryHover || "var(--primary-hover, #1d4ed8)"};

    border-color: ${({ theme }) =>
      theme.colors?.primaryHover || "var(--primary-hover, #1d4ed8)"};

    box-shadow: 0 5px 14px
      ${({ theme }) => theme.colors?.primarySoft || "rgba(37, 99, 235, 0.16)"};
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:focus-visible {
    outline: none;

    box-shadow: 0 0 0 3px
      ${({ theme }) => theme.colors?.primarySoft || "rgba(37, 99, 235, 0.16)"};
  }

  &:disabled {
    opacity: 0.55;

    cursor: not-allowed;

    box-shadow: none;
  }

  @media (max-width: 560px) {
    flex: 1;
  }
`;

// =====================================
// Clear Button
// =====================================

export const ClearButton = styled.button`
  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 7px;

  min-height: 40px;

  padding: 0 14px;

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

  white-space: nowrap;

  cursor: pointer;

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

  &:active:not(:disabled) {
    background: ${({ theme }) =>
      theme.colors?.surfaceSubtle || "var(--surface-subtle, #f8fafc)"};
  }

  &:disabled {
    opacity: 0.5;

    cursor: not-allowed;
  }

  @media (max-width: 560px) {
    flex: 1;
  }
`;
