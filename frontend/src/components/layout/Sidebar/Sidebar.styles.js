import styled from "styled-components";

import { NavLink } from "react-router-dom";

export const SidebarContainer = styled.aside`
  width: ${({ theme }) => theme.layout.sidebarWidth};

  height: 100vh;

  position: sticky;

  top: 0;

  display: flex;

  flex-direction: column;

  padding: ${({ theme }) => theme.spacing.lg};

  background: ${({ theme }) => theme.glass.background};

  backdrop-filter: ${({ theme }) => theme.glass.blur};

  -webkit-backdrop-filter: ${({ theme }) => theme.glass.blur};

  border-right: ${({ theme }) => theme.glass.border};

  overflow: hidden;

  transition: ${({ theme }) => theme.animation.normal};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }

  ${({ mobile }) =>
    mobile &&
    `


        width:100%;



        height:100%;



        position:relative;



        top:auto;



        padding:0;



        display:flex !important;



        background:

            transparent;



        backdrop-filter:none;



        -webkit-backdrop-filter:none;



        border:none;



    `}
`;

export const LogoSection = styled.div`
  display: flex;

  align-items: center;

  gap: ${({ theme }) => theme.spacing.md};

  margin-bottom: ${({ theme }) => theme.spacing.xl};

  flex-shrink: 0;
`;

export const LogoIcon = styled.div`
  width: 42px;

  height: 42px;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: ${({ theme }) => theme.radius.lg};

  background: ${({ theme }) => theme.colors.primary.main};

  color: white;

  font-size: ${({ theme }) => theme.typography.sizes.xl};

  font-weight: 700;
`;

export const BrandText = styled.h2`
  font-size: ${({ theme }) => theme.typography.sizes.xl};

  font-weight: ${({ theme }) => theme.typography.weights.bold};
`;

export const Navigation = styled.nav`
  flex: 1;

  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.lg};

  overflow-y: auto;

  padding-right: 6px;

  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 6px;
  }
`;

export const NavGroup = styled.div`
  display: flex;

  flex-direction: column;

  gap: 6px;
`;

export const GroupTitle = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.xs};

  text-transform: uppercase;

  color: ${({ theme }) => theme.colors.text.muted};

  margin-bottom: 6px;
`;

export const NavItem = styled(NavLink)`
  display: flex;

  align-items: center;

  gap: ${({ theme }) => theme.spacing.md};

  padding: 12px 14px;

  border-radius: ${({ theme }) => theme.radius.md};

  color: ${({ theme }) => theme.colors.text.secondary};

  text-decoration: none;

  transition: ${({ theme }) => theme.animation.fast};

  &:hover {
    background: rgba(37, 99, 235, 0.08);

    color: ${({ theme }) => theme.colors.primary.main};
  }

  &.active {
    background: rgba(37, 99, 235, 0.12);

    color: ${({ theme }) => theme.colors.primary.main};

    font-weight: ${({ theme }) => theme.typography.weights.semibold};
  }
`;

export const NavIcon = styled.span`
  display: flex;

  align-items: center;

  justify-content: center;

  width: 20px;

  font-size: 18px;
`;

export const NavLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;
