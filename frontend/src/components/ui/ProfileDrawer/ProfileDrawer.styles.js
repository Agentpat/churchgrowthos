import styled from "styled-components";

// =====================================
// Overlay
// =====================================

export const Overlay = styled.div`
  position: fixed;

  inset: 0;

  z-index: 900;

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 16px;

  background: rgba(15, 23, 42, 0.32);

  backdrop-filter: blur(5px);

  -webkit-backdrop-filter: blur(5px);

  animation: overlayIn 160ms ease;

  @keyframes overlayIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @media (max-width: 640px) {
    align-items: flex-end;

    padding: 0;
  }
`;

// =====================================
// Drawer
// =====================================

export const Drawer = styled.div`
  width: min(880px, 100%);

  max-height: min(88vh, 760px);

  display: flex;

  flex-direction: column;

  overflow: hidden;

  background: ${({ theme }) =>
    theme.card?.background || theme.colors?.surface?.default || "#ffffff"};

  border: ${({ theme }) =>
    theme.card?.border || "1px solid rgba(15, 23, 42, 0.08)"};

  border-radius: ${({ theme }) => theme.radius?.xl || "18px"};

  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.18);

  animation: drawerIn 180ms ease;

  @keyframes drawerIn {
    from {
      opacity: 0;
      transform: translateY(10px) scale(0.985);
    }

    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (max-width: 768px) {
    width: 100%;

    max-width: 100%;

    max-height: 94vh;

    border-radius: 16px 16px 0 0;
  }

  @media (max-width: 480px) {
    max-height: 94vh;

    border-radius: 15px 15px 0 0;
  }
`;

// =====================================
// Drawer Content
// =====================================

export const DrawerContent = styled.div`
  flex: 1;

  min-height: 0;

  overflow-y: auto;

  padding: 20px 22px;

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

  @media (max-width: 640px) {
    padding: 14px;

    padding-bottom: 12px;
  }
`;

// =====================================
// Header
// =====================================

export const Header = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 12px;

  margin-bottom: 18px;

  padding-bottom: 16px;

  border-bottom: 1px solid
    ${({ theme }) => theme.colors?.border?.light || "rgba(15, 23, 42, 0.06)"};

  @media (max-width: 640px) {
    margin-bottom: 13px;

    padding-bottom: 13px;

    gap: 8px;
  }
`;

// =====================================
// Header Left
// =====================================

export const HeaderLeft = styled.div`
  min-width: 0;

  flex: 1;

  display: flex;

  align-items: center;

  gap: 11px;
`;

// =====================================
// Header Right
// =====================================

export const HeaderRight = styled.div`
  flex-shrink: 0;

  display: flex;

  align-items: center;

  gap: 6px;
`;

// =====================================
// Avatar
// =====================================

export const Avatar = styled.div`
  width: 44px;

  height: 44px;

  min-width: 44px;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 12px;

  background: ${({ theme }) => theme.colors?.primary?.main || "#2563eb"};

  color: #ffffff;

  font-size: 15px;

  font-weight: ${({ theme }) => theme.typography?.weights?.bold || 700};

  box-shadow: 0 5px 14px rgba(37, 99, 235, 0.14);

  @media (max-width: 640px) {
    width: 38px;

    height: 38px;

    min-width: 38px;

    border-radius: 10px;

    font-size: 13px;
  }
`;

// =====================================
// Title Section
// =====================================

export const TitleSection = styled.div`
  min-width: 0;

  display: flex;

  flex-direction: column;

  align-items: flex-start;

  gap: 4px;
`;

// =====================================
// Name
// =====================================

export const Name = styled.h2`
  margin: 0;

  max-width: 420px;

  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;

  color: ${({ theme }) => theme.colors?.text?.primary || "#0f172a"};

  font-size: ${({ theme }) => theme.typography?.sizes?.lg || "18px"};

  line-height: 1.2;

  font-weight: ${({ theme }) => theme.typography?.weights?.bold || 700};

  @media (max-width: 640px) {
    max-width: 230px;

    font-size: 14px;
  }
`;

// =====================================
// Status Badge
// =====================================

export const StatusBadge = styled.span`
  display: inline-flex;

  align-items: center;

  gap: 5px;

  width: fit-content;

  padding: 4px 7px;

  border-radius: 999px;

  background: ${({ active }) =>
    active ? "rgba(22, 163, 74, 0.08)" : "rgba(220, 38, 38, 0.08)"};

  color: ${({ active }) => (active ? "#15803d" : "#b91c1c")};

  font-size: 8px;

  line-height: 1;

  font-weight: 700;

  letter-spacing: 0.035em;

  text-transform: uppercase;

  white-space: nowrap;

  &::before {
    content: "";

    width: 5px;

    height: 5px;

    border-radius: 50%;

    background: ${({ active }) => (active ? "#16a34a" : "#dc2626")};
  }
`;

// =====================================
// Close Button
// =====================================

export const CloseButton = styled.button`
  width: 32px;

  height: 32px;

  min-width: 32px;

  display: flex;

  align-items: center;

  justify-content: center;

  border: 1px solid
    ${({ theme }) => theme.colors?.border?.default || "rgba(15, 23, 42, 0.07)"};

  border-radius: 8px;

  background: ${({ theme }) =>
    theme.colors?.background?.secondary || "#f8fafc"};

  color: ${({ theme }) => theme.colors?.text?.secondary || "#64748b"};

  cursor: pointer;

  font-size: 10px;

  transition:
    background-color 120ms ease,
    color 120ms ease,
    border-color 120ms ease,
    transform 120ms ease;

  &:hover {
    background: rgba(220, 38, 38, 0.07);

    border-color: rgba(220, 38, 38, 0.12);

    color: #dc2626;

    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid rgba(37, 99, 235, 0.15);

    outline-offset: 2px;
  }

  @media (max-width: 640px) {
    width: 30px;

    height: 30px;

    min-width: 30px;

    border-radius: 7px;

    font-size: 9px;
  }
`;

// =====================================
// Tabs
// =====================================

export const Tabs = styled.div`
  display: flex;

  align-items: center;

  gap: 2px;

  margin-bottom: 16px;

  border-bottom: 1px solid
    ${({ theme }) => theme.colors?.border?.light || "rgba(15, 23, 42, 0.06)"};

  overflow-x: auto;

  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

// =====================================
// Tab
// =====================================

export const Tab = styled.button`
  position: relative;

  flex-shrink: 0;

  padding: 8px 11px 9px;

  border: none;

  background: transparent;

  color: ${({ active, theme }) =>
    active
      ? theme.colors?.primary?.main || "#2563eb"
      : theme.colors?.text?.muted || "#94a3b8"};

  cursor: pointer;

  white-space: nowrap;

  font-family: inherit;

  font-size: 10px;

  line-height: 1.2;

  font-weight: ${({ active, theme }) =>
    active
      ? theme.typography?.weights?.semibold || 600
      : theme.typography?.weights?.medium || 500};

  transition: color 120ms ease;

  &::after {
    content: "";

    position: absolute;

    left: 9px;

    right: 9px;

    bottom: -1px;

    height: 2px;

    border-radius: 999px;

    background: ${({ active, theme }) =>
      active ? theme.colors?.primary?.main || "#2563eb" : "transparent"};

    transition: background-color 120ms ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors?.primary?.main || "#2563eb"};
  }

  &:focus-visible {
    outline: none;

    &::after {
      background: ${({ theme }) => theme.colors?.primary?.main || "#2563eb"};
    }
  }

  @media (max-width: 640px) {
    padding: 7px 9px 8px;

    font-size: 9px;
  }
`;

// =====================================
// Content
// =====================================

export const Content = styled.div`
  width: 100%;

  min-width: 0;

  display: flex;

  flex-direction: column;

  gap: 14px;

  box-sizing: border-box;

  color: ${({ theme }) => theme.colors?.text?.primary || "#334155"};

  p {
    margin: 0;

    font-size: 12px;

    line-height: 1.55;

    color: ${({ theme }) => theme.colors?.text?.secondary || "#64748b"};
  }

  strong {
    color: ${({ theme }) => theme.colors?.text?.primary || "#334155"};

    font-weight: ${({ theme }) => theme.typography?.weights?.semibold || 600};
  }

  @media (max-width: 640px) {
    gap: 10px;

    p {
      font-size: 10px;

      line-height: 1.5;
    }
  }
`;

// =====================================
// Footer
// =====================================

export const Footer = styled.div`
  flex-shrink: 0;

  display: flex;

  align-items: center;

  justify-content: flex-end;

  gap: 8px;

  padding: 12px 22px;

  border-top: 1px solid
    ${({ theme }) => theme.colors?.border?.light || "rgba(15, 23, 42, 0.06)"};

  background: ${({ theme }) =>
    theme.card?.background || theme.colors?.surface?.default || "#ffffff"};

  @media (max-width: 640px) {
    padding: 10px 14px;

    justify-content: stretch;
  }
`;

// =====================================
// Action Buttons
// =====================================

export const ActionButtons = styled.div`
  display: flex;

  align-items: center;

  gap: 7px;

  flex-wrap: wrap;

  @media (max-width: 640px) {
    width: 100%;
  }
`;

// =====================================
// Action Button
// =====================================

export const ActionButton = styled.button`
  min-height: 32px;

  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 6px;

  padding: 0 11px;

  border: 1px solid transparent;

  border-radius: 7px;

  cursor: pointer;

  font-family: inherit;

  font-size: 9px;

  line-height: 1;

  font-weight: 600;

  white-space: nowrap;

  transition:
    background-color 120ms ease,
    border-color 120ms ease,
    color 120ms ease,
    transform 120ms ease;

  background: ${({ variant, theme }) => {
    switch (variant) {
      case "success":
        return "rgba(22, 163, 74, 0.08)";

      case "danger":
        return "rgba(220, 38, 38, 0.08)";

      case "secondary":
      default:
        return theme.colors?.primary?.main
          ? `${theme.colors.primary.main}0D`
          : "rgba(37, 99, 235, 0.06)";
    }
  }};

  color: ${({ variant, theme }) => {
    switch (variant) {
      case "success":
        return "#15803d";

      case "danger":
        return "#b91c1c";

      case "secondary":
      default:
        return theme.colors?.primary?.main || "#2563eb";
    }
  }};

  border-color: ${({ variant }) => {
    switch (variant) {
      case "success":
        return "rgba(22, 163, 74, 0.12)";

      case "danger":
        return "rgba(220, 38, 38, 0.12)";

      case "secondary":
      default:
        return "rgba(37, 99, 235, 0.10)";
    }
  }};

  &:hover:not(:disabled) {
    transform: translateY(-1px);

    background: ${({ variant }) => {
      switch (variant) {
        case "success":
          return "rgba(22, 163, 74, 0.12)";

        case "danger":
          return "rgba(220, 38, 38, 0.12)";

        case "secondary":
        default:
          return "rgba(37, 99, 235, 0.10)";
      }
    }};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid rgba(37, 99, 235, 0.15);

    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;

    cursor: not-allowed;

    transform: none;
  }

  svg {
    flex-shrink: 0;

    font-size: 9px;
  }

  @media (max-width: 640px) {
    min-height: 34px;

    flex: 1;

    padding: 0 9px;

    font-size: 9px;
  }
`;
