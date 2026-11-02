import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Label = styled.label`
  font-weight: ${({ theme }) => theme.typography.weights.medium};

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const StyledTextarea = styled.textarea`
  width: 100%;

  min-height: 120px;

  padding: 12px;

  resize: vertical;

  border: ${({ theme }) => theme.card.border};

  border-radius: ${({ theme }) => theme.radius.md};

  font: inherit;

  background: ${({ theme }) => theme.colors.background.primary};

  color: ${({ theme }) => theme.colors.text.primary};

  transition: ${({ theme }) => theme.animation.fast};

  &:focus {
    outline: none;

    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  &:disabled {
    opacity: 0.6;

    cursor: not-allowed;
  }
`;

export const Error = styled.span`
  color: ${({ theme }) => theme.colors.error.main};

  font-size: 12px;
`;
