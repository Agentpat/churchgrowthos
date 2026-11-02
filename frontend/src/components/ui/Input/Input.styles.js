import styled from "styled-components";

// =====================================
// Input Wrapper
// =====================================

export const InputWrapper = styled.div`
  display: flex;

  flex-direction: column;

  gap: 6px;

  min-width: 0;

  width: ${({ $compact }) => ($compact ? "auto" : "100%")};

  flex: ${({ $compact }) => ($compact ? "0 1 auto" : "initial")};

  @media (max-width: 768px) {
    width: 100%;

    flex: 1 1 100%;
  }
`;

// =====================================
// Label
// =====================================

export const Label = styled.label`
  font-size: ${({ theme }) => theme.typography?.sizes?.sm || "12px"};

  line-height: 1.3;

  font-weight: ${({ theme }) => theme.typography?.weights?.medium || 500};

  color: ${({ theme }) => theme.colors?.text?.secondary || "#64748b"};
`;

// =====================================
// Input
// =====================================

export const StyledInput = styled.input`
  width: 100%;

  height: ${({ $compact }) => ($compact ? "38px" : "40px")};

  min-width: ${({ $compact }) => ($compact ? "0" : "0")};

  padding: 0 ${({ $compact }) => ($compact ? "12px" : "13px")};

  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError
        ? theme.colors?.status?.danger ||
          theme.colors?.status?.error ||
          "#dc2626"
        : theme.colors?.border?.default || "rgba(15, 23, 42, 0.10)"};

  border-radius: ${({ theme }) => theme.radius?.md || "9px"};

  background: ${({ theme }) => theme.colors?.surface?.default || "#ffffff"};

  color: ${({ theme }) => theme.colors?.text?.primary || "#334155"};

  font-family: inherit;

  font-size: ${({ theme }) => theme.typography?.sizes?.sm || "12px"};

  line-height: 1;

  outline: none;

  box-shadow: none;

  transition:
    border-color 140ms ease,
    box-shadow 140ms ease,
    background-color 140ms ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors?.text?.muted || "#94a3b8"};

    opacity: 1;
  }

  &:hover:not(:disabled) {
    border-color: ${({ theme }) =>
      theme.colors?.border?.default || "rgba(15, 23, 42, 0.16)"};
  }

  &:focus {
    border-color: ${({ theme, $hasError }) =>
      $hasError
        ? theme.colors?.status?.danger ||
          theme.colors?.status?.error ||
          "#dc2626"
        : theme.colors?.primary?.main || "#2563eb"};

    box-shadow: ${({ $hasError }) =>
      $hasError
        ? "0 0 0 3px rgba(220, 38, 38, 0.08)"
        : "0 0 0 3px rgba(37, 99, 235, 0.08)"};
  }

  &:disabled {
    cursor: not-allowed;

    opacity: 0.55;

    background: ${({ theme }) =>
      theme.colors?.background?.secondary || "#f8fafc"};
  }

  &[type="date"] {
    cursor: pointer;
  }

  &[type="date"]::-webkit-calendar-picker-indicator {
    opacity: 0.55;

    cursor: pointer;
  }

  @media (max-width: 768px) {
    width: 100%;

    min-width: 0;

    height: 40px;
  }
`;

// =====================================
// Error Message
// =====================================

export const ErrorMessage = styled.span`
  margin-top: 1px;

  color: ${({ theme }) =>
    theme.colors?.status?.danger || theme.colors?.status?.error || "#dc2626"};

  font-size: ${({ theme }) => theme.typography?.sizes?.xs || "10px"};

  line-height: 1.4;
`;
