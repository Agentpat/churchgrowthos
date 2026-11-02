import styled from "styled-components";

export const Container = styled.div`
  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: ${({ theme }) => theme.spacing.lg};

  padding: ${({ theme }) => theme.spacing.lg};

  background: ${({ theme }) => theme.card.background};

  border: ${({ theme }) => theme.card.border};

  border-radius: ${({ theme }) => theme.radius.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;

    align-items: stretch;
  }
`;

export const SearchWrapper = styled.div`
  position: relative;

  flex: 1;
`;

export const SearchIcon = styled.div`
  position: absolute;

  left: 14px;

  top: 50%;

  transform: translateY(-50%);

  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const SearchInput = styled.input`
  width: 100%;

  height: 46px;

  padding-left: 42px;

  border-radius: ${({ theme }) => theme.radius.md};

  border: ${({ theme }) => theme.glass.border};

  background: rgba(255, 255, 255, 0.55);

  color: ${({ theme }) => theme.colors.text.primary};

  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const FilterGroup = styled.div`
  display: flex;

  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

export const Select = styled.select`
  height: 46px;

  padding: 0 14px;

  border-radius: ${({ theme }) => theme.radius.md};

  border: ${({ theme }) => theme.glass.border};

  background: rgba(255, 255, 255, 0.55);

  color: ${({ theme }) => theme.colors.text.primary};

  outline: none;

  cursor: pointer;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;
