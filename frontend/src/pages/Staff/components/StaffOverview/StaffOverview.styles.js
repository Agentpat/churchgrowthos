import styled from "styled-components";

// =====================================
// Summary Grid
// =====================================

export const SummaryGrid = styled.section`
  display: grid;

  grid-template-columns: repeat(3, minmax(0, 1fr));

  gap: 16px;

  margin-bottom: 24px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

// =====================================
// Summary Card
// =====================================

export const SummaryCard = styled.article`
  min-width: 0;

  padding: 20px;

  border: 1px solid
    ${({ theme }) => theme.colors?.border || "var(--border, #e2e8f0)"};

  border-radius: 14px;

  background: ${({ theme }) =>
    theme.colors?.surface || "var(--surface, #ffffff)"};

  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);

  transition:
    transform 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease;

  &:hover {
    transform: translateY(-1px);

    border-color: ${({ theme }) =>
      theme.colors?.borderStrong || "var(--border-strong, #cbd5e1)"};

    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
  }
`;

// =====================================
// Card Header
// =====================================

export const SummaryCardHeader = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 12px;
`;

// =====================================
// Label
// =====================================

export const SummaryLabel = styled.span`
  font-size: 13px;

  line-height: 1.4;

  font-weight: 550;

  color: ${({ theme }) =>
    theme.colors?.textSecondary || "var(--text-secondary, #64748b)"};
`;

// =====================================
// Value
// =====================================

export const SummaryValue = styled.strong`
  display: block;

  margin-top: 12px;

  font-size: 30px;

  line-height: 1;

  font-weight: 700;

  letter-spacing: -0.03em;

  color: ${({ theme }) =>
    theme.colors?.textPrimary ||
    theme.colors?.text ||
    "var(--text-primary, #111827)"};

  @media (max-width: 768px) {
    font-size: 26px;
  }
`;

// =====================================
// Meta
// =====================================

export const SummaryMeta = styled.p`
  margin: 10px 0 0;

  font-size: 12px;

  line-height: 1.5;

  color: ${({ theme }) =>
    theme.colors?.textMuted || "var(--text-muted, #94a3b8)"};
`;

// =====================================
// Indicator
// =====================================

export const SummaryIndicator = styled.span`
  display: inline-flex;

  align-items: center;

  justify-content: center;

  min-height: 25px;

  padding: 0 9px;

  border-radius: 999px;

  font-size: 10px;

  font-weight: 650;

  letter-spacing: 0.02em;

  text-transform: uppercase;

  ${({ $variant, theme }) => {
    if ($variant === "success") {
      return `
                background:
                    ${theme.colors?.successSoft || "rgba(22, 163, 74, 0.10)"};

                color:
                    ${theme.colors?.success || "#15803d"};
            `;
    }

    if ($variant === "warning") {
      return `
                background:
                    ${theme.colors?.warningSoft || "rgba(217, 119, 6, 0.10)"};

                color:
                    ${theme.colors?.warning || "#b45309"};
            `;
    }

    return `
            background:
                ${
                  theme.colors?.surfaceSubtle ||
                  "var(--surface-subtle, #f1f5f9)"
                };

            color:
                ${
                  theme.colors?.textSecondary ||
                  "var(--text-secondary, #64748b)"
                };
        `;
  }}
`;
