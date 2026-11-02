import styled from "styled-components";

export const Container = styled.div`
  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: ${({ theme }) => theme.spacing.lg};

  margin-bottom: ${({ theme }) => theme.spacing.xl};

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

  height: 48px;

  padding-left: 42px;

  border-radius: ${({ theme }) => theme.radius.md};

  border: ${({ theme }) => theme.glass.border};

  background: rgba(255, 255, 255, 0.55);

  color: ${({ theme }) => theme.colors.text.primary};

  outline: none;

  transition: ${({ theme }) => theme.animation.fast};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const FilterGroup = styled.div`
  display: flex;

  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;

    width: 100%;
  }
`;

export const Select = styled.select`
  min-width: 170px;

  height: 48px;

  padding: 0 14px;

  border-radius: ${({ theme }) => theme.radius.md};

  border: ${({ theme }) => theme.glass.border};

  background: rgba(255, 255, 255, 0.55);

  color: ${({ theme }) => theme.colors.text.primary};

  outline: none;

  cursor: pointer;

  transition: ${({ theme }) => theme.animation.fast};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
  }
`;
