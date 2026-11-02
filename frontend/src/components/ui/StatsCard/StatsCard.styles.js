import styled from "styled-components";

// =====================================
// Card
// =====================================

export const Card = styled.div`
  min-width: 0;

  display: flex;

  flex-direction: column;

  justify-content: flex-start;

  padding: 13px 14px;

  min-height: 104px;

  background: ${({ theme }) => theme.colors?.surface?.default || "#ffffff"};

  border: 1px solid
    ${({ theme }) => theme.colors?.border?.default || "rgba(15, 23, 42, 0.07)"};

  border-radius: ${({ theme }) => theme.radius?.lg || "12px"};

  box-shadow: ${({ theme }) =>
    theme.shadows?.xs || "0 2px 8px rgba(15, 23, 42, 0.035)"};

  overflow: hidden;

  transition:
    border-color 140ms ease,
    box-shadow 140ms ease,
    transform 140ms ease;

  &:hover {
    border-color: ${({ theme }) =>
      theme.colors?.primary?.light || "rgba(37, 99, 235, 0.20)"};

    box-shadow: ${({ theme }) =>
      theme.shadows?.sm || "0 4px 14px rgba(15, 23, 42, 0.05)"};

    transform: translateY(-1px);
  }

  @media (max-width: 600px) {
    min-height: 91px;

    padding: 11px 12px;

    border-radius: 11px;

    &:hover {
      transform: none;
    }
  }

  @media (max-width: 360px) {
    min-height: 87px;

    padding: 10px;
  }
`;

// =====================================
// Header
// =====================================

export const Header = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  min-width: 0;
`;

// =====================================
// Left
// =====================================

export const Left = styled.div`
  min-width: 0;

  display: flex;

  align-items: center;

  gap: 8px;
`;

// =====================================
// Icon
// =====================================

export const IconWrapper = styled.div`
  width: 28px;

  height: 28px;

  min-width: 28px;

  flex-shrink: 0;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 8px;

  background: ${({ theme }) =>
    theme.colors?.primary?.main
      ? `${theme.colors.primary.main}0D`
      : "rgba(37, 99, 235, 0.05)"};

  color: ${({ theme }) => theme.colors?.primary?.main || "#2563eb"};

  font-size: 12px;

  @media (max-width: 600px) {
    width: 26px;

    height: 26px;

    min-width: 26px;

    border-radius: 7px;

    font-size: 11px;
  }
`;

// =====================================
// Label
// =====================================

export const Label = styled.span`
  min-width: 0;

  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;

  color: ${({ theme }) => theme.colors?.text?.secondary || "#64748b"};

  font-size: ${({ theme }) => theme.typography?.sizes?.xs || "10px"};

  line-height: 1.2;

  font-weight: ${({ theme }) => theme.typography?.weights?.medium || 500};

  @media (max-width: 600px) {
    font-size: 9px;
  }
`;

// =====================================
// Body
// =====================================

export const Body = styled.div`
  min-width: 0;

  display: flex;

  align-items: flex-end;

  justify-content: space-between;

  gap: 6px;

  margin-top: 9px;
`;

// =====================================
// Value
// =====================================

export const Value = styled.h2`
  min-width: 0;

  margin: 0;

  color: ${({ theme }) => theme.colors?.text?.primary || "#172033"};

  font-size: 24px;

  line-height: 1;

  font-weight: ${({ theme }) => theme.typography?.weights?.extraBold || 800};

  letter-spacing: -0.025em;

  white-space: nowrap;

  overflow: hidden;

  text-overflow: ellipsis;

  @media (max-width: 600px) {
    font-size: 21px;
  }

  @media (max-width: 360px) {
    font-size: 19px;
  }
`;

// =====================================
// Trend
// =====================================

export const Trend = styled.span`
  flex-shrink: 0;

  display: inline-flex;

  align-items: center;

  justify-content: center;

  min-height: 20px;

  padding: 0 7px;

  border-radius: 999px;

  font-size: 9px;

  line-height: 1;

  font-weight: 600;

  white-space: nowrap;

  color: ${({ type, theme }) => {
    switch (type) {
      case "positive":
        return theme.colors?.status?.success || "#16a34a";

      case "negative":
        return theme.colors?.status?.danger || "#dc2626";

      case "warning":
        return theme.colors?.status?.warning || "#d97706";

      default:
        return theme.colors?.text?.secondary || "#64748b";
    }
  }};

  background: ${({ type }) => {
    switch (type) {
      case "positive":
        return "rgba(22, 163, 74, 0.08)";

      case "negative":
        return "rgba(220, 38, 38, 0.08)";

      case "warning":
        return "rgba(217, 119, 6, 0.08)";

      default:
        return "rgba(100, 116, 139, 0.07)";
    }
  }};

  @media (max-width: 600px) {
    min-height: 18px;

    padding: 0 6px;

    font-size: 8px;
  }
`;

// =====================================
// Subtitle
// =====================================

export const Subtitle = styled.span`
  display: block;

  margin-top: 7px;

  min-width: 0;

  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;

  color: ${({ theme }) => theme.colors?.text?.muted || "#94a3b8"};

  font-size: ${({ theme }) => theme.typography?.sizes?.xs || "10px"};

  line-height: 1.3;

  font-weight: ${({ theme }) => theme.typography?.weights?.regular || 400};

  @media (max-width: 600px) {
    margin-top: 6px;

    font-size: 8px;
  }
`;
