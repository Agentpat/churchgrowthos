import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;

  inset: 0;

  background: rgba(0, 0, 0, 0.45);

  display: flex;

  align-items: center;

  justify-content: center;

  z-index: 1000;
`;

export const Modal = styled.div`
  width: 450px;

  max-width: 95%;

  background: ${({ theme }) => theme.colors.background.primary};

  border-radius: ${({ theme }) => theme.radius.lg};

  padding: ${({ theme }) => theme.spacing.xl};

  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
`;

export const Title = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing.lg};

  font-size: ${({ theme }) => theme.typography.sizes.lg};
`;

export const Form = styled.form`
  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.md};
`;

export const Select = styled.select`
  width: 100%;

  padding: 12px 14px;

  border-radius: ${({ theme }) => theme.radius.md};

  border: 1px solid ${({ theme }) => theme.colors.border};

  background: ${({ theme }) => theme.colors.background.secondary};

  color: ${({ theme }) => theme.colors.text.primary};

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Actions = styled.div`
  display: flex;

  justify-content: flex-end;

  gap: ${({ theme }) => theme.spacing.md};

  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export const Button = styled.button`
  padding: 10px 18px;

  border: none;

  border-radius: ${({ theme }) => theme.radius.md};

  cursor: pointer;

  background: ${({ theme }) => theme.colors.primary};

  color: white;

  font-weight: 600;

  transition: 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    cursor: not-allowed;

    opacity: 0.6;
  }
`;

export const Loader = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};

  text-align: center;

  color: ${({ theme }) => theme.colors.text.secondary};
`;
