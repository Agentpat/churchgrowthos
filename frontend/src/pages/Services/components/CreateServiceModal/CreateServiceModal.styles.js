import styled from "styled-components";

export const Form = styled.form`
  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.md};

  width: 100%;
`;

export const FieldGroup = styled.div`
  display: grid;

  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.div`
  display: flex;

  flex-direction: column;

  gap: 6px;

  width: 100%;
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.text.primary};

  font-size: ${({ theme }) => theme.typography.sizes.xs};

  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

export const Textarea = styled.textarea`
  width: 100%;

  min-height: 82px;

  resize: vertical;

  box-sizing: border-box;

  padding: 10px 12px;

  border: 1px solid ${({ theme }) => theme.colors.border.default};

  border-radius: ${({ theme }) => theme.radius.md};

  background: ${({ theme }) => theme.colors.surface.default};

  color: ${({ theme }) => theme.colors.text.primary};

  font-family: ${({ theme }) => theme.typography.fontFamily};

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  line-height: ${({ theme }) => theme.typography.lineHeight.normal};

  outline: none;

  transition: ${({ theme }) => theme.animation.fast};

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.muted};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};

    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
  }

  &:disabled {
    opacity: 0.6;

    cursor: not-allowed;
  }
`;

export const Footer = styled.div`
  display: flex;

  justify-content: flex-end;

  align-items: center;

  gap: ${({ theme }) => theme.spacing.sm};

  padding-top: ${({ theme }) => theme.spacing.sm};

  border-top: 1px solid ${({ theme }) => theme.colors.border.light};

  margin-top: ${({ theme }) => theme.spacing.xs};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: grid;

    grid-template-columns: repeat(2, 1fr);
  }
`;

export const ErrorMessage = styled.div`
  padding: 10px 12px;

  border-radius: ${({ theme }) => theme.radius.md};

  background: rgba(220, 38, 38, 0.08);

  border: 1px solid rgba(220, 38, 38, 0.16);

  color: ${({ theme }) => theme.colors.status.danger};

  font-size: ${({ theme }) => theme.typography.sizes.xs};

  font-weight: ${({ theme }) => theme.typography.weights.medium};
`;
