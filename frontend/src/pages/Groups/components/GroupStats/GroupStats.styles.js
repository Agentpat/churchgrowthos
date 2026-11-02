import styled from "styled-components";

export const Container = styled.div`
  display: grid;

  grid-template-columns: repeat(4, 1fr);

  gap: ${({ theme }) => theme.spacing.lg};

  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};

  border-radius: ${({ theme }) => theme.radius.lg};

  background: ${({ theme }) => theme.colors.background.secondary};

  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Label = styled.p`
  margin: 0;

  font-size: 14px;

  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Value = styled.h2`
  margin: ${({ theme }) => theme.spacing.sm} 0 0;
`;
