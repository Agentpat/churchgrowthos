import styled from "styled-components";

export const DashboardContainer = styled.div`
  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.xl};
`;

export const StatsGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(4, 1fr);

  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const ErrorBox = styled.div`
  width: 100%;

  padding: ${({ theme }) => theme.spacing.lg};

  border-radius: ${({ theme }) => theme.radius.lg};

  background: rgba(239, 68, 68, 0.1);

  border: 1px solid rgba(239, 68, 68, 0.25);

  color: ${({ theme }) => theme.colors.status.error};

  text-align: center;

  font-size: ${({ theme }) => theme.typography.sizes.md};
`;
