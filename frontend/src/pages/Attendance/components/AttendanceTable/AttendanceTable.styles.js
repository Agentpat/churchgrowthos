import styled from "styled-components";

// =====================================
// Service Cell
// =====================================

export const ServiceCell = styled.div`
  min-width: 0;

  display: flex;

  flex-direction: column;

  justify-content: center;

  gap: 3px;
`;

// =====================================
// Service Title
// =====================================

export const ServiceTitle = styled.span`
  display: block;

  max-width: 240px;

  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;

  font-size: 12px;

  line-height: 1.35;

  font-weight: ${({ theme }) => theme.typography?.weights?.semibold || 600};

  color: ${({ theme }) => theme.colors?.text?.primary || "#334155"};

  @media (max-width: 640px) {
    max-width: 200px;
  }
`;

// =====================================
// Service Type
// =====================================

export const ServiceType = styled.span`
  display: block;

  max-width: 240px;

  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;

  font-size: 9px;

  line-height: 1.25;

  font-weight: 600;

  letter-spacing: 0.045em;

  text-transform: uppercase;

  color: ${({ theme }) => theme.colors?.text?.muted || "#94a3b8"};

  @media (max-width: 640px) {
    max-width: 200px;
  }
`;

// =====================================
// Check-in Method
// =====================================

export const Method = styled.div`
  display: inline-flex;

  align-items: center;

  gap: 8px;

  min-width: 0;
`;

// =====================================
// Method Icon
// =====================================

export const MethodIcon = styled.span`
  width: 28px;

  height: 28px;

  min-width: 28px;

  display: inline-flex;

  align-items: center;

  justify-content: center;

  border-radius: 8px;

  background: ${({ theme }) =>
    theme.colors?.background?.secondary || "rgba(248, 250, 252, 0.9)"};

  border: 1px solid
    ${({ theme }) => theme.colors?.border?.light || "rgba(15, 23, 42, 0.055)"};

  color: ${({ theme }) => theme.colors?.text?.secondary || "#64748b"};

  font-size: 10px;

  flex-shrink: 0;

  transition:
    background-color 120ms ease,
    color 120ms ease,
    border-color 120ms ease;

  @media (max-width: 640px) {
    width: 26px;

    height: 26px;

    min-width: 26px;
  }
`;

// =====================================
// Method Text
// =====================================

export const MethodText = styled.span`
  font-size: 11px;

  line-height: 1.3;

  font-weight: 600;

  color: ${({ theme }) => theme.colors?.text?.secondary || "#64748b"};

  white-space: nowrap;

  @media (max-width: 640px) {
    font-size: 10px;
  }
`;

// =====================================
// Date
// =====================================

export const DateCell = styled.span`
  display: inline-block;

  font-size: 11px;

  line-height: 1.3;

  font-weight: 500;

  color: ${({ theme }) => theme.colors?.text?.secondary || "#64748b"};

  white-space: nowrap;

  @media (max-width: 640px) {
    font-size: 10px;
  }
`;

// =====================================
// Time
// =====================================

export const TimeCell = styled.span`
  display: inline-block;

  font-size: 11px;

  line-height: 1.3;

  font-weight: 600;

  color: ${({ theme }) => theme.colors?.text?.primary || "#334155"};

  white-space: nowrap;

  @media (max-width: 640px) {
    font-size: 10px;
  }
`;

// =====================================
// Action
// =====================================

export const ActionCell = styled.div`
  display: flex;

  align-items: center;

  justify-content: flex-end;

  width: 100%;

  button {
    min-height: 30px;

    height: 30px;

    padding: 0 10px;

    border-radius: 8px;

    font-size: 10px;

    font-weight: 600;

    gap: 5px;

    box-shadow: none;

    transition:
      background-color 120ms ease,
      border-color 120ms ease,
      color 120ms ease,
      transform 120ms ease,
      box-shadow 120ms ease;
  }

  button:hover:not(:disabled) {
    transform: translateY(-1px);

    box-shadow: 0 3px 8px rgba(15, 23, 42, 0.08);
  }

  button svg {
    font-size: 10px;
  }

  @media (max-width: 640px) {
    button {
      min-height: 29px;

      height: 29px;

      padding: 0 8px;

      font-size: 10px;
    }
  }
`;
