import styled, { css } from "styled-components";

// =====================================
// Button Variants
// =====================================

const variants = (theme, variant) => {
  switch (variant) {
    // =================================
    // Primary
    // =================================

    case "primary":
      return css`
        background: ${theme.colors?.primary?.main || "#2563eb"};

        color: ${theme.colors?.text?.inverse || "#ffffff"};

        border-color: ${theme.colors?.primary?.main || "#2563eb"};

        &:hover:not(:disabled) {
          background: ${theme.colors?.primary?.dark ||
          theme.colors?.primary?.main ||
          "#1d4ed8"};

          border-color: ${theme.colors?.primary?.dark ||
          theme.colors?.primary?.main ||
          "#1d4ed8"};

          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.16);
        }

        &:active:not(:disabled) {
          background: ${theme.colors?.primary?.dark ||
          theme.colors?.primary?.main ||
          "#1d4ed8"};
        }
      `;

    // =================================
    // Secondary
    // =================================

    case "secondary":
      return css`
        background: ${theme.colors?.surface?.default || "#ffffff"};

        color: ${theme.colors?.text?.primary || "#334155"};

        border-color: ${theme.colors?.border?.default ||
        "rgba(15, 23, 42, 0.10)"};

        &:hover:not(:disabled) {
          background: ${theme.colors?.background?.secondary || "#f8fafc"};

          border-color: ${theme.colors?.border?.default ||
          "rgba(15, 23, 42, 0.16)"};

          box-shadow: 0 3px 10px rgba(15, 23, 42, 0.06);
        }
      `;

    // =================================
    // Danger
    // =================================

    case "danger":
      return css`
        background: ${theme.colors?.status?.danger ||
        theme.colors?.status?.error ||
        "#dc2626"};

        color: ${theme.colors?.text?.inverse || "#ffffff"};

        border-color: ${theme.colors?.status?.danger ||
        theme.colors?.status?.error ||
        "#dc2626"};

        &:hover:not(:disabled) {
          filter: brightness(0.95);

          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.14);
        }
      `;

    // =================================
    // Ghost
    // =================================

    case "ghost":
      return css`
        background: transparent;

        color: ${theme.colors?.text?.secondary || "#64748b"};

        border-color: transparent;

        &:hover:not(:disabled) {
          background: ${theme.colors?.background?.secondary ||
          "rgba(15, 23, 42, 0.04)"};

          color: ${theme.colors?.text?.primary || "#334155"};
        }
      `;

    // =================================
    // Outline
    // =================================

    case "outline":
      return css`
        background: transparent;

        color: ${theme.colors?.primary?.main || "#2563eb"};

        border-color: ${theme.colors?.primary?.main || "#2563eb"};

        &:hover:not(:disabled) {
          background: ${theme.colors?.primary?.main
            ? `${theme.colors.primary.main}0A`
            : "rgba(37, 99, 235, 0.04)"};

          box-shadow: 0 3px 10px rgba(37, 99, 235, 0.08);
        }
      `;

    default:
      return css`
        background: ${theme.colors?.surface?.default || "#ffffff"};

        color: ${theme.colors?.text?.primary || "#334155"};

        border-color: ${theme.colors?.border?.default ||
        "rgba(15, 23, 42, 0.10)"};
      `;
  }
};

// =====================================
// Button Sizes
// =====================================

const sizes = {
  small: css`
    min-height: 32px;

    padding: 0 11px;

    font-size: 11px;

    border-radius: 8px;
  `,

  medium: css`
    min-height: 36px;

    padding: 0 14px;

    font-size: 12px;

    border-radius: ${({ theme }) => theme.radius?.md || "9px"};
  `,

  large: css`
    min-height: 42px;

    padding: 0 18px;

    font-size: 13px;

    border-radius: ${({ theme }) => theme.radius?.md || "10px"};
  `,
};

// =====================================
// Styled Button
// =====================================

export const StyledButton = styled.button`
  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: ${({ theme }) => theme.spacing?.sm || "8px"};

  min-width: 0;

  border: 1px solid;

  outline: none;

  cursor: pointer;

  font-family: inherit;

  font-weight: ${({ theme }) => theme.typography?.weights?.semibold || 600};

  line-height: 1;

  white-space: nowrap;

  user-select: none;

  -webkit-tap-highlight-color: transparent;

  transition:
    background-color 140ms ease,
    border-color 140ms ease,
    color 140ms ease,
    box-shadow 140ms ease,
    transform 100ms ease,
    opacity 140ms ease;

  ${({ $size }) => sizes[$size || "medium"]}

  ${({ theme, $variant }) => variants(theme, $variant || "primary")}


    &:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);

    box-shadow: none;
  }

  &:focus-visible {
    outline: 2px solid
      ${({ theme }) => theme.colors?.primary?.main || "#2563eb"};

    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.48;

    cursor: not-allowed;

    transform: none;

    box-shadow: none;
  }

  svg {
    width: 14px;

    height: 14px;

    flex-shrink: 0;
  }

  @media (max-width: 640px) {
    &:not(:disabled) {
      -webkit-tap-highlight-color: transparent;
    }
  }
`;
