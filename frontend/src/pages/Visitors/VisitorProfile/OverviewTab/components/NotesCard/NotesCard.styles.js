import styled from "styled-components";

export const Card = styled.div`
  background: ${({ theme }) => theme.card.background};

  border: ${({ theme }) => theme.card.border};

  border-radius: ${({ theme }) => theme.radius.xl};

  padding: ${({ theme }) => theme.spacing.lg};
`;

export const CardTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.lg};

  font-size: ${({ theme }) => theme.typography.sizes.md};

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Note = styled.p`
  margin: 0;

  line-height: 1.7;

  color: ${({ theme }) => theme.colors.text.secondary};

  white-space: pre-wrap;
`;

export const Empty = styled.div`
  display: flex;

  align-items: center;

  justify-content: center;

  min-height: 120px;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-style: italic;
`;
