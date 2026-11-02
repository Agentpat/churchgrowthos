import styled, { css } from "styled-components";

// =====================================
// FORM
// =====================================

export const Form = styled.div`
  width: 100%;
  min-width: 0;

  display: flex;
  flex-direction: column;

  gap: 14px;

  box-sizing: border-box;
`;

// =====================================
// SERVICE BAR
// =====================================

export const ServiceBar = styled.div`
  width: 100%;
  min-width: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 12px;

  padding: 11px 12px;

  box-sizing: border-box;

  border: 1px solid
    ${({ theme }) => theme.colors?.border?.default || "rgba(15, 23, 42, 0.08)"};

  border-radius: 11px;

  background: ${({ theme }) =>
    theme.colors?.background?.secondary || "#f8fafc"};

  transition:
    border-color 140ms ease,
    background-color 140ms ease;

  @media (max-width: 640px) {
    padding: 10px;

    gap: 8px;

    border-radius: 10px;
  }
`;

// =====================================
// SERVICE INFO
// =====================================

export const ServiceInfo = styled.div`
  min-width: 0;
  flex: 1;

  display: flex;
  align-items: center;

  gap: 9px;
`;

// =====================================
// SERVICE ICON
// =====================================

export const ServiceIcon = styled.div`
  width: 32px;
  height: 32px;
  min-width: 32px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 8px;

  background: ${({ theme }) => theme.colors?.primary?.main || "#2563eb"};

  color: #ffffff;

  font-size: 11px;

  box-shadow: 0 3px 9px rgba(37, 99, 235, 0.16);

  @media (max-width: 640px) {
    width: 29px;
    height: 29px;
    min-width: 29px;

    border-radius: 7px;

    font-size: 10px;
  }
`;

// =====================================
// SERVICE DETAILS
// =====================================

export const ServiceDetails = styled.div`
  min-width: 0;

  display: flex;
  flex-direction: column;

  gap: 2px;
`;

// =====================================
// SERVICE TITLE
// =====================================

export const ServiceTitle = styled.div`
  min-width: 0;
  max-width: 285px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  color: ${({ theme }) => theme.colors?.text?.primary || "#0f172a"};

  font-size: 12px;
  line-height: 1.3;

  font-weight: ${({ theme }) => theme.typography?.weights?.semibold || 600};

  @media (max-width: 640px) {
    max-width: 180px;

    font-size: 10px;
  }
`;

// =====================================
// SERVICE META
// =====================================

export const ServiceMeta = styled.div`
  min-width: 0;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  color: ${({ theme }) => theme.colors?.text?.muted || "#94a3b8"};

  font-size: 8px;
  line-height: 1.2;

  font-weight: 600;

  text-transform: uppercase;
  letter-spacing: 0.045em;
`;

// =====================================
// SESSION STATUS
// =====================================

export const SessionStatus = styled.div`
  flex-shrink: 0;

  display: inline-flex;
  align-items: center;

  gap: 5px;

  padding: 5px 8px;

  border-radius: 999px;

  background: rgba(22, 163, 74, 0.07);

  color: ${({ theme }) => theme.colors?.status?.success || "#16a34a"};

  font-size: 8px;
  line-height: 1;

  font-weight: 600;

  white-space: nowrap;

  @media (max-width: 640px) {
    padding: 5px 6px;

    font-size: 7px;
  }
`;

// =====================================
// SESSION STATUS DOT
// =====================================

export const StatusDot = styled.span`
  width: 5px;
  height: 5px;
  min-width: 5px;

  flex-shrink: 0;

  border-radius: 50%;

  background: ${({ theme }) => theme.colors?.status?.success || "#16a34a"};
`;

// =====================================
// SUMMARY GRID
// =====================================

export const SummaryGrid = styled.div`
  width: 100%;
  min-width: 0;

  display: grid;

  grid-template-columns: repeat(4, minmax(0, 1fr));

  gap: 7px;

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));

    gap: 6px;
  }
`;

// =====================================
// SUMMARY CARD
// =====================================

export const SummaryCard = styled.div`
  min-width: 0;

  display: flex;
  align-items: center;

  gap: 8px;

  padding: 9px;

  box-sizing: border-box;

  border: 1px solid
    ${({ theme }) => theme.colors?.border?.default || "rgba(15, 23, 42, 0.07)"};

  border-radius: 9px;

  background: ${({ theme }) => theme.colors?.surface?.default || "#ffffff"};

  transition:
    border-color 140ms ease,
    box-shadow 140ms ease;

  &:hover {
    border-color: ${({ theme }) =>
      theme.colors?.border?.default || "rgba(15, 23, 42, 0.12)"};

    box-shadow: 0 3px 10px rgba(15, 23, 42, 0.035);
  }

  @media (max-width: 640px) {
    gap: 7px;

    padding: 8px;
  }
`;

// =====================================
// SUMMARY ICON
// =====================================

export const SummaryIcon = styled.div`
  width: 27px;
  height: 27px;
  min-width: 27px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 7px;

  font-size: 10px;

  ${({ variant }) => {
    switch (variant) {
      case "present":
        return css`
          background: rgba(22, 163, 74, 0.09);

          color: #16a34a;
        `;

      case "absent":
        return css`
          background: rgba(220, 38, 38, 0.08);

          color: #dc2626;
        `;

      case "excused":
        return css`
          background: rgba(217, 119, 6, 0.09);

          color: #d97706;
        `;

      case "total":
        return css`
          background: rgba(37, 99, 235, 0.08);

          color: #2563eb;
        `;

      default:
        return css`
          background: rgba(100, 116, 139, 0.07);

          color: #64748b;
        `;
    }
  }}

  @media (max-width: 640px) {
    width: 25px;
    height: 25px;
    min-width: 25px;

    font-size: 9px;
  }
`;

// =====================================
// SUMMARY INFO
// =====================================

export const SummaryInfo = styled.div`
  min-width: 0;

  display: flex;
  flex-direction: column;

  gap: 1px;
`;

// =====================================
// SUMMARY LABEL
// =====================================

export const SummaryLabel = styled.span`
  min-width: 0;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  color: ${({ theme }) => theme.colors?.text?.muted || "#94a3b8"};

  font-size: 8px;
  line-height: 1.2;

  font-weight: 600;

  text-transform: uppercase;
  letter-spacing: 0.035em;

  @media (max-width: 640px) {
    font-size: 7px;
  }
`;

// =====================================
// SUMMARY VALUE
// =====================================

export const SummaryValue = styled.span`
  color: ${({ theme }) => theme.colors?.text?.primary || "#0f172a"};

  font-size: 15px;
  line-height: 1.05;

  font-weight: ${({ theme }) => theme.typography?.weights?.bold || 700};

  @media (max-width: 640px) {
    font-size: 14px;
  }
`;

// =====================================
// TOOLBAR
// =====================================

export const Toolbar = styled.div`
  width: 100%;
  min-width: 0;

  display: flex;
  align-items: flex-end;

  gap: 9px;

  box-sizing: border-box;

  ${({ compact }) =>
    compact &&
    css`
      align-items: center;
    `}

  &:not([data-compact="true"]) {
    & > * {
      flex: 1;
      min-width: 0;
    }
  }

  @media (max-width: 640px) {
    gap: 8px;

    &:not([data-compact="true"]) {
      flex-direction: column;

      align-items: stretch;

      & > * {
        width: 100%;
        flex: none;
      }
    }
  }
`;

// =====================================
// SEARCH BOX
// =====================================

export const SearchBox = styled.div`
  position: relative;

  flex: 1;

  min-width: 0;

  height: 37px;

  display: flex;
  align-items: center;

  box-sizing: border-box;

  border: 1px solid
    ${({ theme }) => theme.colors?.border?.default || "rgba(15, 23, 42, 0.09)"};

  border-radius: 9px;

  background: ${({ theme }) => theme.colors?.surface?.default || "#ffffff"};

  transition:
    border-color 140ms ease,
    box-shadow 140ms ease;

  &:hover {
    border-color: ${({ theme }) =>
      theme.colors?.border?.default || "rgba(15, 23, 42, 0.14)"};
  }

  &:focus-within {
    border-color: ${({ theme }) => theme.colors?.primary?.main || "#2563eb"};

    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.07);
  }

  @media (max-width: 640px) {
    height: 38px;
  }
`;

// =====================================
// SEARCH ICON
// =====================================

export const SearchIcon = styled.span`
  position: absolute;

  left: 11px;
  top: 50%;

  transform: translateY(-50%);

  display: flex;
  align-items: center;
  justify-content: center;

  color: ${({ theme }) => theme.colors?.text?.muted || "#94a3b8"};

  font-size: 9px;

  pointer-events: none;
`;

// =====================================
// SEARCH INPUT
// =====================================

export const SearchInput = styled.input`
  width: 100%;
  height: 100%;

  min-width: 0;

  padding: 0 11px 0 30px;

  border: none;
  outline: none;

  background: transparent;

  color: ${({ theme }) => theme.colors?.text?.primary || "#0f172a"};

  font-family: inherit;

  font-size: 10px;
  line-height: 1;

  &::placeholder {
    color: ${({ theme }) => theme.colors?.text?.muted || "#94a3b8"};

    opacity: 1;
  }
`;

// =====================================
// MEMBER COUNT
// =====================================

export const MemberCount = styled.span`
  flex-shrink: 0;

  color: ${({ theme }) => theme.colors?.text?.muted || "#94a3b8"};

  font-size: 8px;
  line-height: 1;

  font-weight: 600;

  white-space: nowrap;
`;

// =====================================
// MEMBER LIST
// =====================================

export const MemberList = styled.div`
  width: 100%;
  min-width: 0;

  display: flex;
  flex-direction: column;

  max-height: 390px;

  overflow-y: auto;

  box-sizing: border-box;

  border: 1px solid
    ${({ theme }) => theme.colors?.border?.default || "rgba(15, 23, 42, 0.08)"};

  border-radius: 10px;

  background: ${({ theme }) =>
    theme.colors?.background?.secondary || "#f8fafc"};

  scrollbar-width: thin;

  scrollbar-color: ${({ theme }) => theme.colors?.border?.default || "#cbd5e1"}
    transparent;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors?.border?.default || "#cbd5e1"};

    border-radius: 999px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors?.text?.muted || "#94a3b8"};
  }

  @media (max-width: 640px) {
    max-height: 355px;

    border-radius: 9px;
  }
`;

// =====================================
// LIST HEADER
// =====================================

export const ListHeader = styled.div`
  position: sticky;

  top: 0;

  z-index: 4;

  min-height: 32px;

  display: flex;

  align-items: center;
  justify-content: space-between;

  gap: 10px;

  padding: 0 10px;

  box-sizing: border-box;

  background: ${({ theme }) =>
    theme.colors?.background?.secondary || "#f8fafc"};

  border-bottom: 1px solid
    ${({ theme }) => theme.colors?.border?.default || "rgba(15, 23, 42, 0.06)"};

  @media (max-width: 640px) {
    min-height: 31px;

    padding: 0 9px;
  }
`;

// =====================================
// LIST TITLE
// =====================================

export const ListTitle = styled.span`
  color: ${({ theme }) => theme.colors?.text?.secondary || "#64748b"};

  font-size: 8px;
  line-height: 1;

  font-weight: 700;

  text-transform: uppercase;

  letter-spacing: 0.07em;
`;

// =====================================
// LIST HINT
// =====================================

export const ListHint = styled.span`
  color: ${({ theme }) => theme.colors?.text?.muted || "#94a3b8"};

  font-size: 8px;
  line-height: 1;

  font-weight: 500;

  white-space: nowrap;

  @media (max-width: 640px) {
    display: none;
  }
`;

// =====================================
// MEMBER ROW
// =====================================

export const MemberRow = styled.div`
  width: 100%;
  min-width: 0;

  display: flex;

  align-items: center;
  justify-content: space-between;

  gap: 12px;

  padding: 9px 10px;

  box-sizing: border-box;

  background: ${({ theme }) => theme.colors?.surface?.default || "#ffffff"};

  border-bottom: 1px solid
    ${({ theme }) => theme.colors?.border?.light || "rgba(15, 23, 42, 0.045)"};

  transition: background-color 120ms ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ theme }) =>
      theme.colors?.background?.secondary || "#f8fafc"};
  }

  @media (max-width: 640px) {
    flex-direction: column;

    align-items: stretch;

    gap: 8px;

    padding: 10px;
  }
`;

// =====================================
// MEMBER MAIN
// =====================================

export const MemberMain = styled.div`
  min-width: 0;

  flex: 1;

  display: flex;

  align-items: center;

  gap: 8px;
`;

// =====================================
// MEMBER INFO
// =====================================

export const MemberInfo = styled.div`
  min-width: 0;

  flex: 1;

  display: flex;

  flex-direction: column;

  gap: 1px;

  overflow: hidden;
`;

// =====================================
// MEMBER NAME
// =====================================

export const MemberName = styled.span`
  display: block;

  min-width: 0;

  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;

  color: ${({ theme }) => theme.colors?.text?.primary || "#0f172a"};

  font-size: 11px;
  line-height: 1.3;

  font-weight: ${({ theme }) => theme.typography?.weights?.semibold || 600};
`;

// =====================================
// MEMBER META
// =====================================

export const MemberMeta = styled.span`
  display: block;

  min-width: 0;

  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;

  color: ${({ theme }) => theme.colors?.text?.muted || "#94a3b8"};

  font-size: 8px;
  line-height: 1.3;

  font-weight: 500;
`;

// =====================================
// STATUS GROUP
// =====================================

export const StatusGroup = styled.div`
  flex-shrink: 0;

  display: flex;

  align-items: center;

  gap: 4px;

  @media (max-width: 640px) {
    width: 100%;

    display: grid;

    grid-template-columns: repeat(3, minmax(0, 1fr));

    gap: 5px;
  }
`;

// =====================================
// STATUS BUTTON
// =====================================

export const StatusButton = styled.button`
  width: auto;

  min-width: 64px;

  height: 29px;

  padding: 0 8px;

  display: inline-flex;

  align-items: center;
  justify-content: center;

  gap: 5px;

  box-sizing: border-box;

  border: 1px solid
    ${({ theme, $active, $status }) => {
      if (!$active) {
        return theme.colors?.border?.default || "rgba(15, 23, 42, 0.075)";
      }

      if ($status === "PRESENT") {
        return "rgba(22, 163, 74, 0.24)";
      }

      if ($status === "ABSENT") {
        return "rgba(220, 38, 38, 0.20)";
      }

      if ($status === "EXCUSED") {
        return "rgba(217, 119, 6, 0.22)";
      }

      return theme.colors?.border?.default || "rgba(15, 23, 42, 0.08)";
    }};

  border-radius: 7px;

  background: ${({ $active, $status }) => {
    if (!$active) {
      return "#ffffff";
    }

    if ($status === "PRESENT") {
      return "rgba(22, 163, 74, 0.045)";
    }

    if ($status === "ABSENT") {
      return "rgba(220, 38, 38, 0.035)";
    }

    if ($status === "EXCUSED") {
      return "rgba(217, 119, 6, 0.04)";
    }

    return "#ffffff";
  }};

  color: ${({ theme, $active, $status }) => {
    if (!$active) {
      return theme.colors?.text?.secondary || "#64748b";
    }

    if ($status === "PRESENT") {
      return "#15803d";
    }

    if ($status === "ABSENT") {
      return "#b91c1c";
    }

    if ($status === "EXCUSED") {
      return "#b45309";
    }

    return theme.colors?.text?.secondary || "#64748b";
  }};

  font-family: inherit;

  font-size: 8px;
  line-height: 1;

  font-weight: 600;

  white-space: nowrap;

  cursor: pointer;

  transition:
    background-color 120ms ease,
    border-color 120ms ease,
    color 120ms ease,
    transform 120ms ease;

  &:hover {
    transform: translateY(-1px);

    ${({ $active, $status }) =>
      !$active &&
      $status === "PRESENT" &&
      css`
        color: #15803d;

        border-color: rgba(22, 163, 74, 0.22);

        background: rgba(22, 163, 74, 0.035);
      `}

    ${({ $active, $status }) =>
      !$active &&
      $status === "ABSENT" &&
      css`
        color: #b91c1c;

        border-color: rgba(220, 38, 38, 0.19);

        background: rgba(220, 38, 38, 0.03);
      `}

        ${({ $active, $status }) =>
      !$active &&
      $status === "EXCUSED" &&
      css`
        color: #b45309;

        border-color: rgba(217, 119, 6, 0.19);

        background: rgba(217, 119, 6, 0.03);
      `}
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid rgba(37, 99, 235, 0.16);

    outline-offset: 2px;
  }

  @media (max-width: 640px) {
    width: 100%;

    min-width: 0;

    height: 31px;

    padding: 0 4px;

    gap: 4px;

    font-size: 8px;
  }
`;

// =====================================
// STATUS DOT
// =====================================

export const StatusDotSmall = styled.span`
  width: 5px;
  height: 5px;
  min-width: 5px;

  flex-shrink: 0;

  border-radius: 50%;

  background: ${({ $status }) => {
    if ($status === "PRESENT") {
      return "#16a34a";
    }

    if ($status === "ABSENT") {
      return "#dc2626";
    }

    if ($status === "EXCUSED") {
      return "#d97706";
    }

    return "#94a3b8";
  }};
`;

// =====================================
// EMPTY STATE
// =====================================

export const EmptyState = styled.div`
  width: 100%;

  min-height: 150px;

  display: flex;

  flex-direction: column;

  align-items: center;
  justify-content: center;

  gap: 5px;

  padding: 24px 16px;

  box-sizing: border-box;

  text-align: center;

  background: ${({ theme }) => theme.colors?.surface?.default || "#ffffff"};

  svg {
    margin-bottom: 3px;

    font-size: 18px;

    color: ${({ theme }) => theme.colors?.text?.muted || "#94a3b8"};

    opacity: 0.45;
  }

  strong {
    color: ${({ theme }) => theme.colors?.text?.secondary || "#64748b"};

    font-size: 11px;

    line-height: 1.3;

    font-weight: 600;
  }

  span {
    max-width: 240px;

    color: ${({ theme }) => theme.colors?.text?.muted || "#94a3b8"};

    font-size: 9px;

    line-height: 1.4;
  }
`;

// =====================================
// FOOTER
// =====================================

export const Footer = styled.div`
  width: 100%;
  min-width: 0;

  display: flex;

  align-items: center;
  justify-content: space-between;

  gap: 12px;

  padding-top: 12px;

  box-sizing: border-box;

  border-top: 1px solid
    ${({ theme }) => theme.colors?.border?.light || "rgba(15, 23, 42, 0.06)"};

  @media (max-width: 640px) {
    position: sticky;

    bottom: 0;

    z-index: 10;

    width: calc(100% + 28px);

    margin-left: -14px;
    margin-right: -14px;
    margin-bottom: -14px;

    padding: 9px 14px max(9px, env(safe-area-inset-bottom));

    box-sizing: border-box;

    flex-direction: column;

    align-items: stretch;

    gap: 8px;

    background: ${({ theme }) => theme.colors?.surface?.default || "#ffffff"};

    box-shadow: 0 -6px 18px rgba(15, 23, 42, 0.055);
  }
`;

// =====================================
// FOOTER INFO
// =====================================

export const FooterInfo = styled.div`
  min-width: 0;

  display: flex;

  align-items: center;

  gap: 5px;

  color: ${({ theme }) => theme.colors?.text?.muted || "#94a3b8"};

  font-size: 8px;
  line-height: 1.3;

  font-weight: 500;

  white-space: nowrap;

  @media (max-width: 640px) {
    width: 100%;

    justify-content: center;

    font-size: 8px;
  }
`;

// =====================================
// FOOTER COUNT
// =====================================

export const FooterCount = styled.span`
  color: ${({ theme }) => theme.colors?.text?.secondary || "#64748b"};

  font-weight: 700;
`;

// =====================================
// FOOTER ACTIONS
// =====================================

export const FooterActions = styled.div`
  flex-shrink: 0;

  display: flex;

  align-items: center;

  justify-content: flex-end;

  gap: 7px;

  button {
    min-height: 32px;

    padding: 0 12px;

    border-radius: 7px;

    font-size: 9px;

    white-space: nowrap;
  }

  @media (max-width: 640px) {
    width: 100%;

    display: grid;

    grid-template-columns:
      minmax(0, 0.8fr)
      minmax(0, 1.4fr);

    gap: 7px;

    button {
      width: 100%;

      min-width: 0;

      min-height: 36px;

      padding: 0 7px;

      font-size: 9px;
    }
  }
`;
