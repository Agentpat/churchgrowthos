import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;

  inset: 0;

  display: flex;

  align-items: center;

  justify-content: center;

  background: rgba(0, 0, 0, 0.5);

  z-index: 1000;
`;

export const Modal = styled.div`
  width: 420px;

  padding: ${({ theme }) => theme.spacing.lg};

  background: white;

  border-radius: 12px;
`;

export const Title = styled.h2`
  margin-top: 0;
`;

export const Form = styled.form`
  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.md};
`;

export const Input = styled.input`
  padding: 12px;

  border-radius: 8px;

  border: 1px solid #ddd;
`;

export const TextArea = styled.textarea`
  padding: 12px;

  height: 100px;

  border-radius: 8px;

  border: 1px solid #ddd;
`;

export const Select = styled.select`
  padding: 12px;

  border-radius: 8px;

  border: 1px solid #ddd;
`;

export const Actions = styled.div`
  display: flex;

  justify-content: flex-end;

  gap: 12px;
`;

export const Button = styled.button`
  padding: 10px 18px;

  border: none;

  border-radius: 8px;

  cursor: pointer;
`;
