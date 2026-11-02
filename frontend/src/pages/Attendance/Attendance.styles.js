import styled from "styled-components";


// =====================================
// Attendance Workspace Tabs
// =====================================

export const AttendanceTabs = styled.div`
  width: 100%;

  display: grid;

  grid-template-columns: repeat(2, minmax(0, 1fr));

  padding: 4px;

  gap: 4px;

  background: rgba(241, 245, 249, 0.9);

  border: 1px solid rgba(15, 23, 42, 0.07);

  border-radius: 12px;

  @media (min-width: 769px) {
    max-width: 420px;

    margin: 4px auto 0;
  }

  @media (max-width: 768px) {
    margin-top: 1px;

    border-radius: 10px;
  }
`;


// =====================================
// Tab
// =====================================

export const AttendanceTab = styled.button`
  min-width: 0;

  height: 36px;

  padding: 0 14px;

  display: flex;

  align-items: center;
  justify-content: center;

  border: none;

  border-radius: 8px;

  background: ${({ $active }) =>
    $active
      ? "#ffffff"
      : "transparent"};

  color: ${({ $active }) =>
    $active
      ? "#0f172a"
      : "#64748b"};

  font-family: inherit;

  font-size: 11px;

  font-weight: ${({ $active }) =>
    $active ? 700 : 600};

  white-space: nowrap;

  cursor: pointer;

  box-shadow: ${({ $active }) =>
    $active
      ? "0 1px 4px rgba(15, 23, 42, 0.08)"
      : "none"};

  transition:
    background 180ms ease,
    color 180ms ease,
    box-shadow 180ms ease,
    transform 180ms ease;

  &:hover {
    color: #2563eb;
  }

  &:active {
    transform: scale(0.99);
  }

  &:focus-visible {
    outline: 2px solid rgba(37, 99, 235, 0.25);

    outline-offset: 1px;
  }

  @media (max-width: 768px) {
    height: 32px;

    padding: 0 8px;

    border-radius: 7px;

    font-size: 8px;
  }

  @media (max-width: 480px) {
    height: 30px;

    font-size: 7px;
  }
`;