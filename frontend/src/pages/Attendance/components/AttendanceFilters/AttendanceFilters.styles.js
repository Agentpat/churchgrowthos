import styled from "styled-components";

// ============================================================
// DESKTOP FILTER WRAPPER
// ============================================================

export const DesktopFilters = styled.div`
  display: block;
  width: 100%;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    display: none;
  }
`;

// ============================================================
// MOBILE FILTER BAR
// ============================================================

export const MobileFilterContainer = styled.div`
  position: relative;

  display: none;

  width: 100%;

  align-items: center;

  gap: 8px;

  margin: 4px 0 14px;

  z-index: 50;

  @media (max-width: 768px) {
    display: flex;
  }

  @media (max-width: 480px) {
    gap: 7px;

    margin-top: 2px;

    margin-bottom: 13px;
  }
`;

// ============================================================
// MOBILE SEARCH
// ============================================================

export const MobileSearch = styled.div`
  flex: 1;

  min-width: 0;

  height: 36px;

  & > div {
    width: 100%;
  }

  input {
    width: 100%;

    height: 36px;

    min-width: 0;

    padding: 0 12px;

    border-radius: 9px;

    font-size: 10px;
  }

  @media (max-width: 480px) {
    height: 34px;

    input {
      height: 34px;

      font-size: 9px;

      border-radius: 8px;
    }
  }
`;

// ============================================================
// FILTER BUTTON
// ============================================================

export const MobileFilterTrigger = styled.button`
  flex-shrink: 0;

  height: 36px;

  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 6px;

  padding: 0 10px;

  border: 1px solid rgba(37, 99, 235, 0.13);

  border-radius: 9px;

  background: #ffffff;

  color: ${({ theme }) => theme.colors?.text?.secondary || "#475569"};

  font-family: inherit;

  font-size: 9px;

  font-weight: 700;

  cursor: pointer;

  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);

  transition:
    background 150ms ease,
    border-color 150ms ease,
    color 150ms ease,
    transform 150ms ease,
    box-shadow 150ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors?.primary?.main || "#2563eb"};

    border-color: rgba(37, 99, 235, 0.22);

    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.07);
  }

  &:active {
    transform: translateY(1px);
  }

  &:focus-visible {
    outline: none;

    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  & > svg:last-child {
    font-size: 7px;

    color: ${({ theme }) => theme.colors?.text?.muted || "#94a3b8"};
  }

  @media (max-width: 480px) {
    height: 34px;

    padding: 0 9px;

    gap: 5px;

    border-radius: 8px;

    font-size: 8px;
  }
`;

// ============================================================
// FILTER ICON
// ============================================================

export const FilterIcon = styled.span`
  width: 19px;

  height: 19px;

  display: inline-flex;

  align-items: center;

  justify-content: center;

  flex-shrink: 0;

  border-radius: 5px;

  background: rgba(37, 99, 235, 0.08);

  color: ${({ theme }) => theme.colors?.primary?.main || "#2563eb"};

  svg {
    width: 8px;
    height: 8px;
  }

  @media (max-width: 480px) {
    width: 18px;

    height: 18px;

    svg {
      width: 7px;
      height: 7px;
    }
  }
`;

// ============================================================
// FILTER TEXT
// ============================================================

export const FilterTriggerText = styled.span`
  white-space: nowrap;
`;

// ============================================================
// ACTIVE FILTER COUNT
// ============================================================

export const FilterCount = styled.span`
  min-width: 15px;

  height: 15px;

  display: inline-flex;

  align-items: center;

  justify-content: center;

  padding: 0 4px;

  border-radius: 999px;

  background: ${({ theme }) => theme.colors?.primary?.main || "#2563eb"};

  color: #ffffff;

  font-size: 7px;

  font-weight: 700;

  line-height: 1;
`;

// ============================================================
// DROPDOWN PANEL
// ============================================================

export const MobileFilterPanel = styled.div`
  position: absolute;

  top: calc(100% + 8px);

  right: 0;

  width: 300px;

  max-width: calc(100vw - 20px);

  overflow: hidden;

  display: flex;

  flex-direction: column;

  background: ${({ theme }) => theme.colors?.surface?.default || "#ffffff"};

  border: 1px solid rgba(15, 23, 42, 0.075);

  border-radius: 14px;

  box-shadow:
    0 18px 45px rgba(15, 23, 42, 0.13),
    0 4px 14px rgba(15, 23, 42, 0.05);

  transform-origin: top right;

  animation: filterPanelIn 190ms cubic-bezier(0.16, 1, 0.3, 1) both;

  @keyframes filterPanelIn {
    0% {
      opacity: 0;

      transform: translateY(-6px) scale(0.96);
    }

    100% {
      opacity: 1;

      transform: translateY(0) scale(1);
    }
  }

  @media (max-width: 480px) {
    width: 292px;

    max-width: calc(100vw - 16px);

    border-radius: 13px;
  }

  @media (max-width: 340px) {
    width: calc(100vw - 16px);

    right: -1px;
  }
`;

// ============================================================
// PANEL HEADER
// ============================================================

export const MobileFilterHeader = styled.div`
  height: 44px;

  flex-shrink: 0;

  display: flex;

  align-items: center;

  justify-content: space-between;

  padding: 0 12px;

  background: ${({ theme }) =>
    theme.colors?.background?.secondary || "#f8fafc"};

  border-bottom: 1px solid rgba(15, 23, 42, 0.06);
`;

// ============================================================
// PANEL TITLE
// ============================================================

export const MobileFilterTitle = styled.span`
  color: ${({ theme }) => theme.colors?.text?.primary || "#0f172a"};

  font-size: 10px;

  font-weight: 700;
`;

// ============================================================
// CLOSE
// ============================================================

export const MobileCloseButton = styled.button`
  width: 24px;

  height: 24px;

  display: inline-flex;

  align-items: center;

  justify-content: center;

  border: 1px solid rgba(15, 23, 42, 0.07);

  border-radius: 7px;

  background: #ffffff;

  color: ${({ theme }) => theme.colors?.text?.muted || "#94a3b8"};

  cursor: pointer;

  transition:
    color 140ms ease,
    background 140ms ease;

  svg {
    width: 8px;
    height: 8px;
  }

  &:hover {
    color: #dc2626;

    background: rgba(239, 68, 68, 0.05);
  }
`;

// ============================================================
// FIELDS
// ============================================================

export const MobileFilterFields = styled.div`
  display: flex;

  flex-direction: column;

  gap: 10px;

  padding: 13px;
`;

// ============================================================
// INDIVIDUAL FIELD
// ============================================================

export const MobileFilterField = styled.div`
  width: 100%;

  opacity: 0;

  animation: filterFieldIn 380ms cubic-bezier(0.16, 1, 0.3, 1) forwards;

  transform: ${({ $direction }) =>
    $direction === "right"
      ? "translateX(16px) scale(.97)"
      : "translateX(-16px) scale(.97)"};

  animation-delay: ${({ $direction }) =>
    $direction === "right" ? "90ms" : "35ms"};

  &:nth-child(2) {
    animation-delay: 110ms;
  }

  &:nth-child(3) {
    animation-delay: 160ms;
  }

  @keyframes filterFieldIn {
    from {
      opacity: 0;

      filter: blur(2px);

      transform: ${({ $direction }) =>
        $direction === "right"
          ? "translateX(16px) scale(.97)"
          : "translateX(-16px) scale(.97)"};
    }

    to {
      opacity: 1;

      filter: blur(0);

      transform: translateX(0) scale(1);
    }
  }

  label {
    font-size: 8px;
  }

  input,
  select {
    height: 37px;

    min-height: 37px;

    font-size: 10px;

    border-radius: 8px;
  }
`;

// ============================================================
// ACTIONS
// ============================================================

export const MobileFilterActions = styled.div`
  display: grid;

  grid-template-columns: auto 1fr;

  align-items: center;

  gap: 8px;

  padding: 10px 13px;

  border-top: 1px solid rgba(15, 23, 42, 0.06);
`;

// ============================================================
// CLEAR
// ============================================================

export const ClearButton = styled.button`
  height: 33px;

  padding: 0 12px;

  border: 1px solid rgba(15, 23, 42, 0.09);

  border-radius: 8px;

  background: #ffffff;

  color: ${({ theme }) => theme.colors?.text?.secondary || "#64748b"};

  font-family: inherit;

  font-size: 9px;

  font-weight: 650;

  cursor: pointer;

  transition:
    background 140ms ease,
    border-color 140ms ease;

  &:hover {
    background: #f8fafc;

    border-color: rgba(15, 23, 42, 0.14);
  }
`;

// ============================================================
// APPLY
// ============================================================

export const ApplyButton = styled.button`
  width: 100%;

  height: 33px;

  border: none;

  border-radius: 8px;

  background: ${({ theme }) => theme.colors?.primary?.main || "#2563eb"};

  color: #ffffff;

  font-family: inherit;

  font-size: 9px;

  font-weight: 700;

  cursor: pointer;

  box-shadow: 0 3px 9px rgba(37, 99, 235, 0.18);

  transition:
    transform 140ms ease,
    box-shadow 140ms ease;

  &:hover {
    transform: translateY(-1px);

    box-shadow: 0 5px 13px rgba(37, 99, 235, 0.22);
  }

  &:active {
    transform: translateY(0);
  }
`;
