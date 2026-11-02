import styled from "styled-components";

export const Container = styled.div`
  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.lg};
`;

export const Header = styled.div`
  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: ${({ theme }) => theme.spacing.md};
`;

export const Title = styled.h1`
  margin: 0;
`;

export const Description = styled.p`
  margin: 8px 0 0;

  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Actions = styled.div`
  button {
    padding: 10px 18px;

    border: none;

    border-radius: 8px;

    cursor: pointer;
  }
`;
