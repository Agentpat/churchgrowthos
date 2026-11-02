import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: 100%;

  height: ${({ theme }) => theme.layout.desktopHeaderHeight};

  display: flex;

  align-items: center;

  justify-content: space-between;

  padding: 0 ${({ theme }) => theme.spacing.xl};

  background: ${({ theme }) => theme.glass.background};

  backdrop-filter: ${({ theme }) => theme.glass.blur};

  -webkit-backdrop-filter: ${({ theme }) => theme.glass.blur};

  border-bottom: ${({ theme }) => theme.glass.border};

  position: sticky;

  top: 0;

  z-index: ${({ theme }) => theme.zIndex.header};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: ${({ theme }) => theme.layout.mobileHeaderHeight};

    padding: 0 ${({ theme }) => theme.mobile.pagePadding};
  }
`;

export const LeftSection = styled.div`
  display: flex;

  align-items: center;

  gap: ${({ theme }) => theme.spacing.md};
`;

export const MenuButton = styled.button`
  display: none;

  width: 40px;

  height: 40px;

  align-items: center;

  justify-content: center;

  border: none;

  border-radius: ${({ theme }) => theme.radius.md};

  cursor: pointer;

  background: rgba(255, 255, 255, 0.5);

  color: ${({ theme }) => theme.colors.text.primary};

  transition: ${({ theme }) => theme.animation.fast};

  &:hover {
    background: rgba(37, 99, 235, 0.1);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
  }
`;

export const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.sizes.xl};

  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

export const ChurchName = styled.span`
  display: block;

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  color: ${({ theme }) => theme.colors.text.muted};
`;

export const RightSection = styled.div`
  display: flex;

  align-items: center;

  gap: ${({ theme }) => theme.spacing.md};
`;

export const NotificationButton = styled.button`
  width: 42px;

  height: 42px;

  border: none;

  border-radius: ${({ theme }) => theme.radius.circle};

  display: flex;

  align-items: center;

  justify-content: center;

  cursor: pointer;

  color: ${({ theme }) => theme.colors.text.secondary};

  background: rgba(255, 255, 255, 0.5);

  transition: ${({ theme }) => theme.animation.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};

    transform: translateY(-2px);
  }
`;

export const ProfileCard = styled.div`
  display: flex;

  align-items: center;

  gap: ${({ theme }) => theme.spacing.sm};

  padding: 6px 12px;

  border-radius: ${({ theme }) => theme.radius.lg};

  background: rgba(255, 255, 255, 0.5);
`;

export const Avatar = styled.div`
  width: 38px;

  height: 38px;

  border-radius: ${({ theme }) => theme.radius.circle};

  display: flex;

  align-items: center;

  justify-content: center;

  background: ${({ theme }) => theme.colors.primary.main};

  color: white;

  font-weight: 700;
`;

export const UserInfo = styled.div`
  display: flex;

  flex-direction: column;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

export const UserName = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.sm};

  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

export const UserRole = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.xs};

  color: ${({ theme }) => theme.colors.text.muted};
`;
