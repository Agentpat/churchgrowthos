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

const inputStyles = `

    width: 100%;

    box-sizing: border-box;

    padding: 10px 12px;

    border:
        1px solid
        #E2E8F0;

    border-radius: 10px;

    background: #FFFFFF;

    color: #0F172A;

    font-family:
        'Inter',
        'Segoe UI',
        Arial,
        sans-serif;

    font-size: 14px;

    outline: none;

    transition:
        border-color 150ms ease,
        box-shadow 150ms ease;

    &:focus {

        border-color: #2563EB;

        box-shadow:
            0 0 0 3px
            rgba(37, 99, 235, 0.12);

    }

    &:disabled {

        opacity: 0.6;

        cursor: not-allowed;

    }

`;

export const Input = styled.input`
  ${inputStyles}

  height: 42px;
`;

export const Select = styled.select`
  ${inputStyles}

  height: 42px;

  cursor: pointer;
`;

export const Textarea = styled.textarea`
  ${inputStyles}

  min-height: 78px;

  resize: vertical;

  line-height: 1.5;
`;

export const Footer = styled.div`
  display: flex;

  justify-content: flex-end;

  align-items: center;

  gap: ${({ theme }) => theme.spacing.sm};

  padding-top: ${({ theme }) => theme.spacing.sm};

  border-top: 1px solid ${({ theme }) => theme.colors.border.light};

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
