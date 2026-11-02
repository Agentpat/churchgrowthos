import styled from "styled-components";

// =====================================
// Filters Container
// =====================================

export const FiltersContainer = styled.div`
  width: 100%;

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 12px;

  margin-bottom: ${({ theme }) => theme.spacing?.lg || "18px"};

  padding: 10px;

  background: ${({ theme }) => theme.colors?.surface?.default || "#ffffff"};

  border: 1px solid
    ${({ theme }) => theme.colors?.border?.default || "rgba(15, 23, 42, 0.08)"};

  border-radius: ${({ theme }) => theme.radius?.lg || "12px"};

  box-shadow: ${({ theme }) =>
    theme.shadows?.xs || "0 2px 8px rgba(15, 23, 42, 0.035)"};

  transition:
    border-color 140ms ease,
    box-shadow 140ms ease;

  &:focus-within {
    border-color: rgba(37, 99, 235, 0.16);

    box-shadow: 0 3px 14px rgba(15, 23, 42, 0.05);
  }

  @media (max-width: 768px) {
    flex-direction: column;

    align-items: stretch;

    gap: 8px;

    padding: 9px;

    margin-bottom: 14px;
  }
`;

// =====================================
// Left / Filter Controls
// =====================================

export const Left = styled.div`
  min-width: 0;

  flex: 1;

  display: flex;

  align-items: center;

  gap: 8px;

  /*
     * Search field
     *
     * The first control gets more space because
     * searching members is the primary action.
     */

  & > :first-child {
    flex: 1 1 260px;

    min-width: 220px;
  }

  /*
     * Select controls
     */

  & > :nth-child(2),
  & > :nth-child(3) {
    flex: 0 0 160px;

    width: 160px;

    min-width: 160px;
  }

  /*
     * Date control
     */

  & > :nth-child(4) {
    flex: 0 0 150px;

    width: 150px;

    min-width: 150px;
  }

  /*
     * Keep compact controls visually aligned.
     */

  & > * {
    min-width: 0;
  }

  @media (max-width: 1024px) {
    flex-wrap: wrap;

    & > :first-child {
      flex: 1 1 100%;

      min-width: 100%;
    }

    & > :nth-child(2),
    & > :nth-child(3),
    & > :nth-child(4) {
      flex: 1 1 150px;

      width: auto;

      min-width: 140px;
    }
  }

  @media (max-width: 768px) {
    width: 100%;

    flex-direction: column;

    align-items: stretch;

    gap: 8px;

    & > :first-child,
    & > :nth-child(2),
    & > :nth-child(3),
    & > :nth-child(4) {
      width: 100%;

      min-width: 0;

      flex: 1 1 auto;
    }
  }
`;

// =====================================
// Right / Actions
// =====================================

export const Right = styled.div`
  flex-shrink: 0;

  display: flex;

  align-items: center;

  justify-content: flex-end;

  gap: 6px;

  @media (max-width: 768px) {
    width: 100%;

    justify-content: stretch;

    & > * {
      flex: 1;
    }
  }
`;
