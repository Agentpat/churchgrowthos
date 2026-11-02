import styled from "styled-components";

export const LayoutContainer = styled.div`
  min-height: 100vh;

  display: flex;

  background: ${({ theme }) => theme.colors.background.main};
`;

export const MainContent = styled.main`
  flex: 1;

  display: flex;

  flex-direction: column;

  min-width: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
  }
`;

export const PageContainer = styled.section`
  flex: 1;

  width: 100%;

  padding: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.mobile.pagePadding};
  }
`;
