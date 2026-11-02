import styled from "styled-components";

// =====================================
// Select Wrapper
// =====================================

export const SelectWrapper = styled.div`
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
// Select Field
// =====================================

export const SelectField = styled.div`
  position: relative;

  width: 100%;

  min-width: ${({ $compact }) => ($compact ? "150px" : "0")};

  height: ${({ $compact }) => ($compact ? "38px" : "40px")};
`;

// =====================================
// Select
// =====================================

export const StyledSelect = styled.select`
  appearance: none;

  -webkit-appearance: none;

  width: 100%;

  height: 100%;

  min-width: 0;

  padding: 0 34px 0 12px;

  border: 1px solid
    ${({ theme }) => theme.colors?.border?.default || "rgba(15, 23, 42, 0.10)"};

  border-radius: ${({ theme }) => theme.radius?.md || "9px"};

  background: ${({ theme }) => theme.colors?.surface?.default || "#ffffff"};

  color: ${({ theme }) => theme.colors?.text?.primary || "#334155"};

  font-family: inherit;

  font-size: ${({ theme }) => theme.typography?.sizes?.sm || "12px"};

  font-weight: ${({ theme }) => theme.typography?.weights?.medium || 500};

  line-height: 1;

  outline: none;

  cursor: pointer;

  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.02);

  transition:
    border-color 140ms ease,
    box-shadow 140ms ease,
    background-color 140ms ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) =>
      theme.colors?.background?.secondary || "#fafbfc"};

    border-color: rgba(15, 23, 42, 0.16);
  }

  &:focus {
    background: ${({ theme }) => theme.colors?.surface?.default || "#ffffff"};

    border-color: ${({ theme }) => theme.colors?.primary?.main || "#2563eb"};

    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.08);
  }

  &:disabled {
    opacity: 0.55;

    cursor: not-allowed;

    background: ${({ theme }) =>
      theme.colors?.background?.secondary || "#f8fafc"};
  }

  option {
    background: ${({ theme }) => theme.colors?.surface?.default || "#ffffff"};

    color: ${({ theme }) => theme.colors?.text?.primary || "#334155"};
  }

  @media (max-width: 768px) {
    height: 40px;
  }
`;

// =====================================
// Chevron
// =====================================

export const Chevron = styled.span`
  position: absolute;

  top: 50%;

  right: ${({ $compact }) => ($compact ? "12px" : "13px")};

  transform: translateY(-50%);

  display: flex;

  align-items: center;

  justify-content: center;

  width: 14px;

  height: 14px;

  pointer-events: none;

  color: ${({ theme }) => theme.colors?.text?.muted || "#94a3b8"};

  font-size: 9px;

  transition: color 140ms ease;

  ${SelectField}:hover & {
    color: ${({ theme }) => theme.colors?.text?.secondary || "#64748b"};
  }
`;
