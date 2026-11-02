import styled, { css } from "styled-components";

// =====================================
// Badge Variants
// =====================================

const variants = (theme, variant) => {
  switch (variant) {
    case "success":
      return css`
        background: rgba(16, 185, 129, 0.08);

        color: ${theme.colors?.status?.success || "#059669"};

        border-color: rgba(16, 185, 129, 0.16);
      `;

    case "warning":
      return css`
        background: rgba(245, 158, 11, 0.08);

        color: ${theme.colors?.status?.warning || "#d97706"};

        border-color: rgba(245, 158, 11, 0.16);
      `;

    case "danger":
      return css`
        background: rgba(239, 68, 68, 0.08);

        color: ${theme.colors?.status?.danger || "#dc2626"};

        border-color: rgba(239, 68, 68, 0.16);
      `;

    case "info":
      return css`
        background: rgba(14, 165, 233, 0.08);

        color: ${theme.colors?.status?.info || "#0284c7"};

        border-color: rgba(14, 165, 233, 0.16);
      `;

    case "primary":
      return css`
        background: ${({ theme }) =>
          theme.colors?.primary?.main
            ? `${theme.colors.primary.main}0D`
            : "rgba(79, 70, 229, 0.06)"};

        color: ${theme.colors?.primary?.main || "#4f46e5"};

        border-color: ${({ theme }) =>
          theme.colors?.primary?.main
            ? `${theme.colors.primary.main}1A`
            : "rgba(79, 70, 229, 0.10)"};
      `;

    default:
      return css`
        background: ${theme.colors?.background?.secondary ||
        "rgba(100, 116, 139, 0.06)"};

        color: ${theme.colors?.text?.secondary || "#64748b"};

        border-color: ${theme.colors?.border?.default ||
        "rgba(15, 23, 42, 0.08)"};
      `;
  }
};

// =====================================
// Badge Sizes
// =====================================

const sizes = {
  sm: css`
    min-height: 22px;

    padding: 0 7px;

    font-size: 9px;
  `,

  md: css`
    min-height: 24px;

    padding: 0 8px;

    font-size: 10px;
  `,

  lg: css`
    min-height: 28px;

    padding: 0 10px;

    font-size: 11px;
  `,
};

// =====================================
// Styled Badge
// =====================================

export const StyledBadge = styled.span`
  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 5px;

  width: fit-content;

  min-width: 0;

  border-radius: ${({ theme }) => theme.radius?.pill || "999px"};

  border: 1px solid;

  font-weight: ${({ theme }) => theme.typography?.weights?.semibold || 600};

  line-height: 1;

  letter-spacing: 0.035em;

  text-transform: uppercase;

  white-space: nowrap;

  transition:
    background-color 140ms ease,
    border-color 140ms ease,
    color 140ms ease;

  ${({ $size }) => sizes[$size || "md"]}

  ${({ theme, $variant }) => variants(theme, $variant || "default")}
`;
