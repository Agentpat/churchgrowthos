import styled from "styled-components";

export const Title = styled.h4`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const Table = styled.div`
  display: flex;

  flex-direction: column;

  gap: 8px;
`;

export const Row = styled.div`
  display: grid;

  grid-template-columns: repeat(4, 1fr);

  padding: ${({ theme }) => theme.spacing.md};

  background: ${({ theme }) => theme.card.background};

  border: ${({ theme }) => theme.card.border};

  border-radius: ${({ theme }) => theme.radius.md};
`;

export const HeaderRow = styled(Row)`
  font-weight: bold;
`;

export const Cell = styled.div`
  font-size: 14px;
`;
