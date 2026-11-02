import styled from "styled-components";

// =====================================
// Form
// =====================================

export const Form = styled.form`
  width: 100%;
`;

// =====================================
// Form Grid
// =====================================

export const FormGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: 18px 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;

    gap: 16px;
  }
`;

// =====================================
// Field
// =====================================

export const Field = styled.div`
  display: flex;

  flex-direction: column;

  gap: 7px;

  min-width: 0;
`;

// =====================================
// Full Width Field
// =====================================

export const FieldFull = styled(Field)`
  grid-column: 1 / -1;
`;

// =====================================
// Label
// =====================================

export const Label = styled.label`
  display: inline-flex;

  align-items: center;

  gap: 3px;

  color: ${({ theme }) =>
    theme.colors?.textPrimary ||
    theme.colors?.text ||
    "var(--text-primary, #1e293b)"};

  font-size: 13px;

  font-weight: 600;

  line-height: 1.4;
`;

// =====================================
// Required
// =====================================

export const Required = styled.span`
  color: ${({ theme }) => theme.colors?.danger || "#dc2626"};
`;

// =====================================
// Input
// =====================================

export const Input = styled.input`
  width: 100%;

  min-height: 42px;

  box-sizing: border-box;

  padding: 0 12px;

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

  &:hover:not(:disabled) {
    border-color: ${({ theme }) =>
      theme.colors?.borderStrong || "var(--border-strong, #cbd5e1)"};
  }

  &:focus {
    border-color: ${({ theme }) =>
      theme.colors?.primary || "var(--primary, #2563eb)"};

    box-shadow: 0 0 0 3px
      ${({ theme }) => theme.colors?.primarySoft || "rgba(37, 99, 235, 0.10)"};
  }

  &:disabled {
    opacity: 0.6;

    cursor: not-allowed;

    background: ${({ theme }) =>
      theme.colors?.surfaceSubtle || "var(--surface-subtle, #f8fafc)"};
  }
`;

// =====================================
// Select
// =====================================

export const Select = styled.select`
  width: 100%;

  min-height: 42px;

  box-sizing: border-box;

  padding: 0 12px;

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
    box-shadow 160ms ease;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) =>
      theme.colors?.borderStrong || "var(--border-strong, #cbd5e1)"};
  }

  &:focus {
    border-color: ${({ theme }) =>
      theme.colors?.primary || "var(--primary, #2563eb)"};

    box-shadow: 0 0 0 3px
      ${({ theme }) => theme.colors?.primarySoft || "rgba(37, 99, 235, 0.10)"};
  }

  &:disabled {
    opacity: 0.6;

    cursor: not-allowed;
  }
`;

// =====================================
// Textarea
// =====================================

export const Textarea = styled.textarea`
  width: 100%;

  box-sizing: border-box;

  min-height: 110px;

  padding: 11px 12px;

  border: 1px solid
    ${({ theme }) => theme.colors?.border || "var(--border, #cbd5e1)"};

  border-radius: 9px;

  outline: none;

  resize: vertical;

  background: ${({ theme }) =>
    theme.colors?.surface || "var(--surface, #ffffff)"};

  color: ${({ theme }) =>
    theme.colors?.textPrimary ||
    theme.colors?.text ||
    "var(--text-primary, #111827)"};

  font-family: inherit;

  font-size: 13px;

  line-height: 1.5;

  transition:
    border-color 160ms ease,
    box-shadow 160ms ease;

  &::placeholder {
    color: ${({ theme }) =>
      theme.colors?.textMuted || "var(--text-muted, #94a3b8)"};
  }

  &:hover:not(:disabled) {
    border-color: ${({ theme }) =>
      theme.colors?.borderStrong || "var(--border-strong, #cbd5e1)"};
  }

  &:focus {
    border-color: ${({ theme }) =>
      theme.colors?.primary || "var(--primary, #2563eb)"};

    box-shadow: 0 0 0 3px
      ${({ theme }) => theme.colors?.primarySoft || "rgba(37, 99, 235, 0.10)"};
  }

  &:disabled {
    opacity: 0.6;

    cursor: not-allowed;
  }
`;

// =====================================
// Service Areas
// =====================================

export const ServiceAreas = styled.div`
  display: flex;

  align-items: center;

  gap: 8px;

  @media (max-width: 560px) {
    align-items: stretch;

    flex-direction: column;
  }
`;

// =====================================
// Service Area Input
// =====================================

export const ServiceAreaInput = styled(Input)`
  flex: 1;

  min-width: 0;
`;

// =====================================
// Add Service Area Button
// =====================================

export const AddServiceAreaButton = styled.button`
  min-height: 42px;

  padding: 0 15px;

  border: 1px solid
    ${({ theme }) => theme.colors?.border || "var(--border, #cbd5e1)"};

  border-radius: 9px;

  background: ${({ theme }) =>
    theme.colors?.surfaceSubtle || "var(--surface-subtle, #f8fafc)"};

  color: ${({ theme }) =>
    theme.colors?.textSecondary || "var(--text-secondary, #64748b)"};

  font-family: inherit;

  font-size: 13px;

  font-weight: 600;

  cursor: pointer;

  transition:
    background-color 160ms ease,
    border-color 160ms ease,
    color 160ms ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) =>
      theme.colors?.surfaceHover || "var(--surface-hover, #f1f5f9)"};

    border-color: ${({ theme }) =>
      theme.colors?.borderStrong || "var(--border-strong, #cbd5e1)"};

    color: ${({ theme }) =>
      theme.colors?.textPrimary || "var(--text-primary, #334155)"};
  }

  &:disabled {
    opacity: 0.5;

    cursor: not-allowed;
  }

  @media (max-width: 560px) {
    width: 100%;
  }
`;

// =====================================
// Service Area List
// =====================================

export const ServiceAreaList = styled.div`
  display: flex;

  flex-wrap: wrap;

  gap: 7px;

  margin-top: 9px;
`;

// =====================================
// Service Area Item
// =====================================

export const ServiceAreaItem = styled.span`
  display: inline-flex;

  align-items: center;

  gap: 5px;

  min-height: 28px;

  padding: 0 7px 0 10px;

  border: 1px solid
    ${({ theme }) => theme.colors?.border || "var(--border, #e2e8f0)"};

  border-radius: 999px;

  background: ${({ theme }) =>
    theme.colors?.surfaceSubtle || "var(--surface-subtle, #f8fafc)"};

  color: ${({ theme }) =>
    theme.colors?.textSecondary || "var(--text-secondary, #475569)"};

  font-size: 11px;

  font-weight: 600;
`;

// =====================================
// Remove Service Area
// =====================================

export const RemoveServiceAreaButton = styled.button`
  display: inline-flex;

  align-items: center;

  justify-content: center;

  width: 20px;

  height: 20px;

  padding: 0;

  border: 0;

  border-radius: 50%;

  background: transparent;

  color: ${({ theme }) =>
    theme.colors?.textMuted || "var(--text-muted, #94a3b8)"};

  font-size: 16px;

  line-height: 1;

  cursor: pointer;

  transition:
    background-color 140ms ease,
    color 140ms ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) =>
      theme.colors?.dangerSoft || "rgba(220, 38, 38, 0.08)"};

    color: ${({ theme }) => theme.colors?.danger || "#dc2626"};
  }

  &:disabled {
    opacity: 0.5;

    cursor: not-allowed;
  }
`;

// =====================================
// Error Message
// =====================================

export const ErrorMessage = styled.div`
  margin-top: 16px;

  padding: 10px 12px;

  border: 1px solid
    ${({ theme }) => theme.colors?.dangerBorder || "rgba(220, 38, 38, 0.18)"};

  border-radius: 8px;

  background: ${({ theme }) =>
    theme.colors?.dangerSoft || "rgba(220, 38, 38, 0.06)"};

  color: ${({ theme }) => theme.colors?.danger || "#dc2626"};

  font-size: 12px;

  line-height: 1.5;
`;

// =====================================
// Form Actions
// =====================================

export const FormActions = styled.div`
  display: flex;

  align-items: center;

  justify-content: flex-end;

  gap: 9px;

  margin-top: 24px;

  padding-top: 18px;

  border-top: 1px solid
    ${({ theme }) => theme.colors?.border || "var(--border, #e2e8f0)"};

  @media (max-width: 480px) {
    flex-direction: column-reverse;

    align-items: stretch;
  }
`;

// =====================================
// Cancel Button
// =====================================

export const CancelButton = styled.button`
  min-height: 40px;

  padding: 0 15px;

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

  transition:
    background-color 160ms ease,
    border-color 160ms ease,
    color 160ms ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) =>
      theme.colors?.surfaceHover || "var(--surface-hover, #f8fafc)"};

    border-color: ${({ theme }) =>
      theme.colors?.borderStrong || "var(--border-strong, #cbd5e1)"};

    color: ${({ theme }) =>
      theme.colors?.textPrimary || "var(--text-primary, #334155)"};
  }

  &:disabled {
    opacity: 0.5;

    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

// =====================================
// Submit Button
// =====================================

export const SubmitButton = styled.button`
  min-height: 40px;

  padding: 0 17px;

  border: 1px solid
    ${({ theme }) => theme.colors?.primary || "var(--primary, #2563eb)"};

  border-radius: 9px;

  background: ${({ theme }) =>
    theme.colors?.primary || "var(--primary, #2563eb)"};

  color: ${({ theme }) => theme.colors?.primaryContrast || "#ffffff"};

  font-family: inherit;

  font-size: 13px;

  font-weight: 600;

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

  @media (max-width: 480px) {
    width: 100%;
  }
`;
