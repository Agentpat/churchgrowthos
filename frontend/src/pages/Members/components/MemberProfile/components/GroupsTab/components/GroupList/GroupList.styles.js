import styled from "styled-components";

export const List = styled.div`
  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.md};
`;

export const Card = styled.div`
  padding: ${({ theme }) => theme.spacing.md};

  border-radius: 12px;

  background: ${({ theme }) => theme.colors.background.secondary};
`;

export const Name = styled.h4`
  margin: 0 0 8px 0;
`;

export const Info = styled.p`
  margin: 4px 0;

  color: ${({ theme }) => theme.colors.text.secondary};
`;
