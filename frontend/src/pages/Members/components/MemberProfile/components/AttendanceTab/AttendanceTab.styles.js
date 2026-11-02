import styled from "styled-components";

export const Container = styled.div`
  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.lg};
`;

export const Title = styled.h3`
  margin: 0;

  font-size: ${({ theme }) => theme.typography.sizes.lg};

  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

export const Description = styled.p`
  margin: 0;

  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Loader = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};

  text-align: center;

  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Empty = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};

  text-align: center;

  border-radius: ${({ theme }) => theme.radius.lg};

  background: ${({ theme }) => theme.card.background};

  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Error = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};

  text-align: center;

  border-radius: ${({ theme }) => theme.radius.lg};

  color: ${({ theme }) => theme.colors.danger || "red"};
`;
