import styled, { css } from "styled-components";

// =====================================
// Avatar Sizes
// =====================================

const avatarSizes = {
  sm: css`
    width: 30px;
    height: 30px;

    font-size: 10px;
  `,

  md: css`
    width: 34px;
    height: 34px;

    font-size: 11px;
  `,

  lg: css`
    width: 44px;
    height: 44px;

    font-size: 13px;
  `,
};

// =====================================
// Container
// =====================================

export const AvatarContainer = styled.div`
  display: flex;

  align-items: center;

  gap: ${({ theme }) => theme.spacing?.sm || "8px"};

  min-width: 0;

  max-width: 100%;
`;

// =====================================
// Image
// =====================================

export const AvatarImage = styled.img`
  ${({ $size }) => avatarSizes[$size || "md"]}

  flex-shrink: 0;

  display: block;

  object-fit: cover;

  border-radius: ${({ theme }) => theme.radius?.circle || "50%"};

  background: ${({ theme }) =>
    theme.colors?.background?.secondary || "#f1f5f9"};

  border: 1px solid rgba(15, 23, 42, 0.06);
`;

// =====================================
// Initials
// =====================================

export const AvatarInitials = styled.div`
  ${({ $size }) => avatarSizes[$size || "md"]}

  flex-shrink: 0;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: ${({ theme }) => theme.radius?.circle || "50%"};

  background: ${({ theme }) => theme.colors?.primary?.main || "#4f46e5"};

  color: ${({ theme }) => theme.colors?.text?.inverse || "#ffffff"};

  font-weight: ${({ theme }) => theme.typography?.weights?.bold || 700};

  letter-spacing: -0.01em;

  user-select: none;
`;

// =====================================
// Information
// =====================================

export const AvatarInfo = styled.div`
  min-width: 0;

  display: flex;

  flex-direction: column;

  justify-content: center;
`;

// =====================================
// Name
// =====================================

export const AvatarName = styled.div`
  min-width: 0;

  max-width: 220px;

  color: ${({ theme }) => theme.colors?.text?.primary || "#334155"};

  font-size: ${({ theme }) => theme.typography?.sizes?.sm || "12px"};

  line-height: 1.35;

  font-weight: ${({ theme }) => theme.typography?.weights?.semibold || 600};

  white-space: nowrap;

  overflow: hidden;

  text-overflow: ellipsis;
`;

// =====================================
// Subtitle
// =====================================

export const AvatarSubtitle = styled.div`
  min-width: 0;

  max-width: 220px;

  margin-top: 2px;

  color: ${({ theme }) => theme.colors?.text?.muted || "#94a3b8"};

  font-size: ${({ theme }) => theme.typography?.sizes?.xs || "10px"};

  line-height: 1.3;

  font-weight: 500;

  white-space: nowrap;

  overflow: hidden;

  text-overflow: ellipsis;

  text-transform: capitalize;
`;
