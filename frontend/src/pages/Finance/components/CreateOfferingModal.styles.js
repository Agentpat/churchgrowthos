import styled from "styled-components";

export const Form = styled.form`
  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.md};
`;

export const FieldGroup = styled.div`
  display: grid;

  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.div`
  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.xs};
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.sizes.sm};

  font-weight: ${({ theme }) => theme.typography.weights.semibold};

  color: ${({ theme }) => theme.colors.text.primary};
`;

const inputStyles = `
    width: 100%;

    padding: 11px 12px;

    border: 1px solid rgba(15, 23, 42, 0.12);

    border-radius: 10px;

    outline: none;

    font-size: 14px;

    color: #0f172a;

    background: rgba(255, 255, 255, 0.8);

    transition: 0.2s ease;

    box-sizing: border-box;

    &:focus {
        border-color: rgba(59, 130, 246, 0.5);

        box-shadow:
            0 0 0 3px
            rgba(59, 130, 246, 0.1);
    }

    &:disabled {
        opacity: 0.6;

        cursor: not-allowed;
    }
`;

export const Input = styled.input`
  ${inputStyles}
`;

export const Select = styled.select`
  ${inputStyles}

  cursor: pointer;
`;

export const Textarea = styled.textarea`
  ${inputStyles}

  resize: vertical;

  min-height: 90px;
`;

export const Actions = styled.div`
  display: flex;

  justify-content: flex-end;

  gap: ${({ theme }) => theme.spacing.sm};

  padding-top: ${({ theme }) => theme.spacing.sm};
`;

export const ErrorMessage = styled.div`
  padding: 10px 12px;

  border-radius: 8px;

  background: rgba(239, 68, 68, 0.08);

  color: ${({ theme }) => theme.colors.status.error};

  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;
