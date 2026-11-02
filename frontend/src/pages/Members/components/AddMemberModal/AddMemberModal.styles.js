import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;

  inset: 0;

  background: rgba(15, 23, 42, 0.65);

  backdrop-filter: blur(8px);

  display: flex;

  justify-content: center;

  align-items: center;

  z-index: 1000;
`;

export const Modal = styled.div`
  width: 100%;

  max-width: 520px;

  max-height: 90vh;

  overflow-y: auto;

  padding: ${({ theme }) => theme.spacing.xl};

  background: ${({ theme }) => theme.card.background};

  border: ${({ theme }) => theme.card.border};

  border-radius: ${({ theme }) => theme.radius.xl};

  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

export const Header = styled.div`
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const Title = styled.h2`
  display: flex;

  align-items: center;

  gap: ${({ theme }) => theme.spacing.sm};

  margin: 0;

  font-size: ${({ theme }) => theme.typography.sizes.xl};

  font-weight: ${({ theme }) => theme.typography.weights.bold};

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const CloseButton = styled.button`
  border: none;

  background: transparent;

  cursor: pointer;

  font-size: 20px;

  color: ${({ theme }) => theme.colors.text.secondary};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const Form = styled.form`
  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.lg};
`;

export const InputGroup = styled.div`
  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.sizes.sm};

  font-weight: ${({ theme }) => theme.typography.weights.medium};

  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Input = styled.input`
  width: 100%;

  padding: 12px 14px;

  border-radius: ${({ theme }) => theme.radius.md};

  border: ${({ theme }) => theme.card.border};

  background: rgba(255, 255, 255, 0.05);

  color: ${({ theme }) => theme.colors.text.primary};

  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const Select = styled.select`
  width: 100%;

  padding: 12px 14px;

  border-radius: ${({ theme }) => theme.radius.md};

  border: ${({ theme }) => theme.card.border};

  background: rgba(255, 255, 255, 0.05);

  color: ${({ theme }) => theme.colors.text.primary};

  outline: none;
`;

export const Actions = styled.div`
  display: flex;

  justify-content: flex-end;

  gap: ${({ theme }) => theme.spacing.md};

  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const CancelButton = styled.button`
  padding: 10px 18px;

  border: none;

  border-radius: ${({ theme }) => theme.radius.md};

  cursor: pointer;

  background: rgba(148, 163, 184, 0.15);

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const SubmitButton = styled.button`
  padding: 10px 18px;

  border: none;

  border-radius: ${({ theme }) => theme.radius.md};

  cursor: pointer;

  background: ${({ theme }) => theme.colors.primary.main};

  color: white;

  font-weight: ${({ theme }) => theme.typography.weights.medium};
`;

export const ErrorMessage = styled.div`
  padding: 12px;

  border-radius: ${({ theme }) => theme.radius.md};

  background: rgba(239, 68, 68, 0.12);

  color: #dc2626;

  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;
