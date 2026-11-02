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
  width: 420px;

  max-width: 90%;

  padding: ${({ theme }) => theme.spacing.xl};

  background: ${({ theme }) => theme.card.background};

  border: ${({ theme }) => theme.card.border};

  border-radius: ${({ theme }) => theme.radius.xl};

  text-align: center;

  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
`;

export const Icon = styled.div`
  width: 60px;

  height: 60px;

  margin: 0 auto ${({ theme }) => theme.spacing.md};

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 50%;

  background: rgba(239, 68, 68, 0.12);

  color: #dc2626;

  font-size: 26px;
`;

export const Title = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};

  font-size: ${({ theme }) => theme.typography.sizes.lg};

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Description = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  line-height: 1.6;

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Actions = styled.div`
  display: flex;

  justify-content: flex-end;

  gap: ${({ theme }) => theme.spacing.md};
`;

export const CancelButton = styled.button`
  padding: 10px 18px;

  border-radius: ${({ theme }) => theme.radius.md};

  border: ${({ theme }) => theme.card.border};

  background: transparent;

  color: ${({ theme }) => theme.colors.text.primary};

  cursor: pointer;

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  transition: 0.2s;

  &:hover {
    background: rgba(148, 163, 184, 0.1);
  }
`;

export const ConfirmButton = styled.button`
  padding: 10px 18px;

  border-radius: ${({ theme }) => theme.radius.md};

  border: none;

  background: #dc2626;

  color: white;

  cursor: pointer;

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  transition: 0.2s;

  &:hover {
    background: #b91c1c;
  }
`;
