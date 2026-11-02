import styled from "styled-components";

export const Tabs = styled.div`
  display: flex;

  align-items: center;

  gap: ${({ theme }) => theme.spacing.xs};

  margin-bottom: ${({ theme }) => theme.spacing.lg};

  padding: ${({ theme }) => theme.spacing.xs};

  width: fit-content;

  border-radius: ${({ theme }) => theme.radius.md};

  background: rgba(15, 23, 42, 0.04);

  @media (max-width: 600px) {
    width: 100%;

    overflow-x: auto;
  }
`;

export const Tab = styled.button`
  display: flex;

  align-items: center;

  justify-content: center;

  gap: ${({ theme }) => theme.spacing.sm};

  padding: 10px 16px;

  border: none;

  border-radius: ${({ theme }) => theme.radius.md};

  cursor: pointer;

  white-space: nowrap;

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  font-weight: ${({ theme }) => theme.typography.weights.semibold};

  color: ${({ $active, theme }) =>
    $active ? theme.colors.text.primary : theme.colors.text.secondary};

  background: ${({ $active }) => ($active ? "white" : "transparent")};

  box-shadow: ${({ $active, theme }) => ($active ? theme.shadows.sm : "none")};

  transition: ${({ theme }) => theme.animation.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }

  svg {
    font-size: 14px;
  }
`;
