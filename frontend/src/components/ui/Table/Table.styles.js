import styled from "styled-components";

// =====================================
// Table Wrapper
// =====================================

export const TableWrapper = styled.div`
  width: 100%;

  min-width: 0;

  background: ${({ theme }) =>
    theme.card?.background || theme.colors?.surface?.default || "#ffffff"};

  border: ${({ theme }) =>
    theme.card?.border ||
    `1px solid ${theme.colors?.border?.default || "rgba(15, 23, 42, 0.08)"}`};

  border-radius: ${({ theme }) => theme.card?.radius || "14px"};

  overflow: hidden;

  box-shadow: ${({ theme }) =>
    theme.shadows?.xs || "0 2px 10px rgba(15, 23, 42, 0.035)"};

  transition:
    box-shadow 160ms ease,
    border-color 160ms ease;

  &:hover {
    box-shadow: ${({ theme }) =>
      theme.shadows?.sm || "0 5px 18px rgba(15, 23, 42, 0.055)"};
  }

  @media (max-width: 640px) {
    border-radius: 12px;
  }
`;

// =====================================
// Scroll Container
// =====================================

export const TableScroll = styled.div`
  width: 100%;

  overflow-x: auto;

  overflow-y: auto;

  max-height: 68vh;

  overscroll-behavior: contain;

  -webkit-overflow-scrolling: touch;

  scrollbar-width: thin;

  scrollbar-color: ${({ theme }) => theme.colors?.border?.default || "#cbd5e1"}
    transparent;

  &::-webkit-scrollbar {
    width: 6px;

    height: 6px;
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
`;

// =====================================
// Table
// =====================================

export const StyledTable = styled.table`
  width: 100%;

  min-width: 900px;

  border-collapse: separate;

  border-spacing: 0;

  table-layout: auto;

  @media (max-width: 640px) {
    min-width: 820px;
  }
`;

// =====================================
// Table Head
// =====================================

export const TableHead = styled.thead`
  position: sticky;

  top: 0;

  z-index: 5;

  background: ${({ theme }) => theme.colors?.surface?.default || "#ffffff"};
`;

// =====================================
// Header Cell
// =====================================

export const TableHeader = styled.th`
  width: ${({ $width }) => $width || "auto"};

  height: 42px;

  padding: 0 14px;

  text-align: ${({ $align }) => $align || "left"};

  white-space: nowrap;

  font-size: ${({ theme }) => theme.typography?.sizes?.xs || "10px"};

  line-height: 1;

  font-weight: ${({ theme }) => theme.typography?.weights?.semibold || 600};

  text-transform: uppercase;

  letter-spacing: 0.055em;

  color: ${({ theme }) => theme.colors?.text?.muted || "#94a3b8"};

  background: ${({ theme }) => theme.colors?.surface?.default || "#ffffff"};

  border-bottom: 1px solid
    ${({ theme }) => theme.colors?.border?.default || "rgba(15, 23, 42, 0.075)"};

  &:first-child {
    padding-left: 18px;
  }

  &:last-child {
    padding-right: 18px;
  }

  @media (max-width: 640px) {
    height: 40px;

    padding: 0 12px;

    &:first-child {
      padding-left: 14px;
    }

    &:last-child {
      padding-right: 14px;
    }
  }
`;

// =====================================
// Body
// =====================================

export const TableBody = styled.tbody`
  background: ${({ theme }) => theme.colors?.surface?.default || "#ffffff"};
`;

// =====================================
// Row
// =====================================

export const TableRow = styled.tr`
  transition: background-color 120ms ease;

  &:hover {
    background: ${({ theme }) =>
      theme.colors?.background?.secondary || "rgba(248, 250, 252, 0.72)"};
  }

  &:not(:last-child) td {
    border-bottom: 1px solid
      ${({ theme }) => theme.colors?.border?.light || "rgba(15, 23, 42, 0.05)"};
  }
`;

// =====================================
// Cell
// =====================================

export const TableCell = styled.td`
  height: 58px;

  padding: 8px 14px;

  text-align: ${({ $align }) => $align || "left"};

  vertical-align: middle;

  color: ${({ theme }) => theme.colors?.text?.primary || "#334155"};

  font-size: ${({ theme }) => theme.typography?.sizes?.sm || "12px"};

  line-height: 1.4;

  font-weight: ${({ theme }) => theme.typography?.weights?.medium || 500};

  white-space: nowrap;

  &:first-child {
    padding-left: 18px;
  }

  &:last-child {
    padding-right: 18px;
  }

  @media (max-width: 640px) {
    height: 54px;

    padding: 7px 12px;

    &:first-child {
      padding-left: 14px;
    }

    &:last-child {
      padding-right: 14px;
    }
  }
`;

// =====================================
// Empty State
// =====================================

export const EmptyState = styled.div`
  min-height: 190px;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  gap: 5px;

  padding: 32px 20px;

  text-align: center;

  background: ${({ theme }) => theme.colors?.surface?.default || "#ffffff"};
`;

// =====================================
// Empty State Title
// =====================================

export const EmptyStateTitle = styled.div`
  font-size: 13px;

  line-height: 1.4;

  font-weight: ${({ theme }) => theme.typography?.weights?.semibold || 600};

  color: ${({ theme }) => theme.colors?.text?.secondary || "#64748b"};
`;

// =====================================
// Empty State Description
// =====================================

export const EmptyStateDescription = styled.div`
  max-width: 300px;

  font-size: 11px;

  line-height: 1.5;

  color: ${({ theme }) => theme.colors?.text?.muted || "#94a3b8"};
`;
