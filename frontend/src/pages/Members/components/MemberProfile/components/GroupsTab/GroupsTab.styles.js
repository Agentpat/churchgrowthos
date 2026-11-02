import styled from "styled-components";

export const Container = styled.div`
  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.lg};
`;

export const Title = styled.h3`
  margin: 0;
`;

export const Description = styled.p`
  margin: 0;

  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Loader = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};

  text-align: center;
`;

export const Empty = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};

  text-align: center;

  color: ${({ theme }) => theme.colors.text.secondary};
`;
