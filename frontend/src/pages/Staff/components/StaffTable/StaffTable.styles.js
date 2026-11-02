import styled from "styled-components";

// =====================================
// Table Wrapper
// =====================================

export const TableWrapper = styled.div`
  width: 100%;

  overflow-x: auto;

  scrollbar-width: thin;

  scrollbar-color: ${({ theme }) =>
      theme.colors?.borderStrong || "var(--border-strong, #cbd5e1)"}
    transparent;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) =>
      theme.colors?.borderStrong || "var(--border-strong, #cbd5e1)"};

    border-radius: 999px;
  }
`;

// =====================================
// Table
// =====================================

export const Table = styled.table`
  width: 100%;

  min-width: 900px;

  border-collapse: separate;

  border-spacing: 0;
`;

// =====================================
// Table Head
// =====================================

export const TableHead = styled.thead`
  background: ${({ theme }) =>
    theme.colors?.surfaceSubtle || "var(--surface-subtle, #fafafa)"};
`;

// =====================================
// Table Header Cell
// =====================================

export const TableHeaderCell = styled.th`
  padding: 12px 18px;

  border-bottom: 1px solid
    ${({ theme }) => theme.colors?.border || "var(--border, #e2e8f0)"};

  color: ${({ theme }) =>
    theme.colors?.textMuted || "var(--text-muted, #64748b)"};

  font-size: 11px;

  font-weight: 650;

  line-height: 1.4;

  letter-spacing: 0.04em;

  text-align: left;

  text-transform: uppercase;

  white-space: nowrap;

  &:last-child {
    text-align: right;
  }
`;

// =====================================
// Table Body
// =====================================

export const TableBody = styled.tbody`
  background: ${({ theme }) =>
    theme.colors?.surface || "var(--surface, #ffffff)"};
`;

// =====================================
// Table Row
// =====================================

export const TableRow = styled.tr`
  transition: background-color 140ms ease;

  &:hover {
    background: ${({ theme }) =>
      theme.colors?.surfaceHover || "var(--surface-hover, #f8fafc)"};
  }

  &:last-child td {
    border-bottom: none;
  }
`;

// =====================================
// Table Cell
// =====================================

export const TableCell = styled.td`
  padding: 15px 18px;

  border-bottom: 1px solid
    ${({ theme }) => theme.colors?.border || "var(--border, #eef2f7)"};

  color: ${({ theme }) =>
    theme.colors?.textPrimary ||
    theme.colors?.text ||
    "var(--text-primary, #1e293b)"};

  font-size: 13px;

  vertical-align: middle;

  &:last-child {
    text-align: right;
  }
`;

// =====================================
// Staff Info
// =====================================

export const StaffInfo = styled.div`
  min-width: 180px;

  display: flex;

  flex-direction: column;

  gap: 3px;
`;

// =====================================
// Staff Name
// =====================================

export const StaffName = styled.span`
  color: ${({ theme }) =>
    theme.colors?.textPrimary ||
    theme.colors?.text ||
    "var(--text-primary, #111827)"};

  font-size: 13px;

  font-weight: 650;

  line-height: 1.4;

  white-space: nowrap;
`;

// =====================================
// Staff Email
// =====================================

export const StaffEmail = styled.span`
  max-width: 240px;

  overflow: hidden;

  color: ${({ theme }) =>
    theme.colors?.textMuted || "var(--text-muted, #94a3b8)"};

  font-size: 12px;

  line-height: 1.4;

  text-overflow: ellipsis;

  white-space: nowrap;
`;

// =====================================
// Department
// =====================================

export const DepartmentText = styled.span`
  color: ${({ theme }) =>
    theme.colors?.textSecondary || "var(--text-secondary, #64748b)"};

  font-size: 13px;

  white-space: nowrap;
`;

// =====================================
// Staff Role
// =====================================

export const RoleText = styled.span`
  color: ${({ theme }) =>
    theme.colors?.textSecondary || "var(--text-secondary, #64748b)"};

  font-size: 13px;

  white-space: nowrap;
`;

// =====================================
// Phone
// =====================================

export const PhoneText = styled.span`
  color: ${({ theme }) =>
    theme.colors?.textSecondary || "var(--text-secondary, #64748b)"};

  font-size: 13px;

  white-space: nowrap;
`;

// =====================================
// Status Badge
// =====================================

export const StatusBadge = styled.span`
  display: inline-flex;

  align-items: center;

  justify-content: center;

  min-height: 25px;

  padding: 0 9px;

  border-radius: 999px;

  font-size: 11px;

  font-weight: 650;

  line-height: 1;

  white-space: nowrap;

  ${({ $status, theme }) => {
    if ($status === "ACTIVE") {
      return `
        background:
          ${theme.colors?.successSoft || "rgba(22, 163, 74, 0.10)"};

        color:
          ${theme.colors?.success || "#15803d"};
      `;
    }

    return `
      background:
        ${theme.colors?.surfaceSubtle || "var(--surface-subtle, #f1f5f9)"};

      color:
        ${theme.colors?.textMuted || "var(--text-muted, #64748b)"};
    `;
  }}
`;

// =====================================
// Actions
// =====================================

export const Actions = styled.div`
  display: flex;

  align-items: center;

  justify-content: flex-end;

  gap: 6px;

  white-space: nowrap;
`;

// =====================================
// Action Button
// =====================================

export const ActionButton = styled.button`
  min-height: 30px;

  padding: 0 9px;

  border: 1px solid
    ${({ $danger, theme }) =>
      $danger
        ? theme.colors?.dangerBorder || "rgba(220, 38, 38, 0.18)"
        : theme.colors?.border || "var(--border, #e2e8f0)"};

  border-radius: 7px;

  background: ${({ $danger, theme }) =>
    $danger
      ? theme.colors?.dangerSoft || "rgba(220, 38, 38, 0.06)"
      : theme.colors?.surface || "var(--surface, #ffffff)"};

  color: ${({ $danger, theme }) =>
    $danger
      ? theme.colors?.danger || "#dc2626"
      : theme.colors?.textSecondary || "var(--text-secondary, #64748b)"};

  font-family: inherit;

  font-size: 11px;

  font-weight: 600;

  cursor: pointer;

  transition:
    background-color 140ms ease,
    border-color 140ms ease,
    color 140ms ease;

  &:hover:not(:disabled) {
    ${({ $danger, theme }) =>
      $danger
        ? `
          background:
            ${theme.colors?.dangerSoft || "rgba(220, 38, 38, 0.10)"};

          border-color:
            ${theme.colors?.dangerBorder || "rgba(220, 38, 38, 0.25)"};

          color:
            ${theme.colors?.danger || "#dc2626"};
        `
        : `
          background:
            ${theme.colors?.surfaceHover || "var(--surface-hover, #f8fafc)"};

          border-color:
            ${theme.colors?.borderStrong || "var(--border-strong, #cbd5e1)"};

          color:
            ${theme.colors?.textPrimary || "var(--text-primary, #334155)"};
        `}
  }

  &:focus-visible {
    outline: none;

    box-shadow: 0 0 0 3px
      ${({ $danger, theme }) =>
        $danger
          ? theme.colors?.dangerSoft || "rgba(220, 38, 38, 0.10)"
          : theme.colors?.primarySoft || "rgba(37, 99, 235, 0.10)"};
  }

  &:disabled {
    opacity: 0.5;

    cursor: not-allowed;
  }
`;
