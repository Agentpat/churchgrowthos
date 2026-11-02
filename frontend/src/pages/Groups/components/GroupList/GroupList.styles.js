import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export const Grid = styled.div`
  display: grid;

  grid-template-columns: repeat(3, minmax(0, 1fr));

  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const EmptyCard = styled.div`
  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  min-height: 250px;

  padding: ${({ theme }) => theme.spacing.xl};

  text-align: center;

  background: ${({ theme }) => theme.glass.background};

  backdrop-filter: ${({ theme }) => theme.glass.blur};

  border: ${({ theme }) => theme.glass.border};

  border-radius: ${({ theme }) => theme.radius.xl};

  box-shadow: ${({ theme }) => theme.glass.shadow};

  h3 {
    margin-bottom: ${({ theme }) => theme.spacing.sm};

    color: ${({ theme }) => theme.colors.text.primary};
  }

  p {
    max-width: 400px;

    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const LoaderCard = styled.div`
  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.md};

  padding: 20px;

  background: ${({ theme }) => theme.glass.background};

  border: ${({ theme }) => theme.glass.border};

  border-radius: ${({ theme }) => theme.radius.lg};
`;

export const Skeleton = styled.div`
  height: ${({ small }) => (small ? "16px" : "60px")};

  width: 100%;

  border-radius: ${({ theme }) => theme.radius.md};

  background: rgba(148, 163, 184, 0.25);

  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% {
      opacity: 0.5;
    }

    50% {
      opacity: 1;
    }

    100% {
      opacity: 0.5;
    }
  }
`;
