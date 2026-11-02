import styled from "styled-components";

export const Card = styled.div`
  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.md};

  padding: 20px;

  background: ${({ theme }) => theme.glass.background};

  backdrop-filter: ${({ theme }) => theme.glass.blur};

  -webkit-backdrop-filter: ${({ theme }) => theme.glass.blur};

  border: ${({ theme }) => theme.glass.border};

  border-radius: ${({ theme }) => theme.radius.lg};

  box-shadow: ${({ theme }) => theme.shadows.sm};

  transition: ${({ theme }) => theme.animation.normal};

  &:hover {
    transform: translateY(-3px);

    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

export const Header = styled.div`
  display: flex;

  align-items: center;

  gap: ${({ theme }) => theme.spacing.md};
`;

export const IconBox = styled.div`
  width: 44px;

  height: 44px;

  flex-shrink: 0;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: ${({ theme }) => theme.radius.md};

  background: rgba(37, 99, 235, 0.12);

  color: ${({ theme }) => theme.colors.primary.main};

  font-size: 18px;
`;

export const Content = styled.div`
  display: flex;

  flex-direction: column;

  gap: 6px;
`;

export const GroupName = styled.h3`
  margin: 0;

  font-size: ${({ theme }) => theme.typography.sizes.lg};

  font-weight: ${({ theme }) => theme.typography.weights.semibold};

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const TypeBadge = styled.span`
  width: max-content;

  padding: 4px 10px;

  border-radius: ${({ theme }) => theme.radius.pill};

  background: rgba(37, 99, 235, 0.1);

  color: ${({ theme }) => theme.colors.primary.main};

  font-size: 11px;

  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

export const Description = styled.p`
  margin-top: 4px;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
`;

export const Details = styled.div`
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 12px;
`;

export const DetailItem = styled.div`
  padding: 12px;

  border-radius: ${({ theme }) => theme.radius.md};

  background: rgba(248, 250, 252, 0.75);
`;

export const Label = styled.span`
  display: block;

  color: ${({ theme }) => theme.colors.text.muted};

  font-size: 11px;

  text-transform: uppercase;

  letter-spacing: 0.5px;
`;

export const Value = styled.div`
  margin-top: 4px;

  color: ${({ theme }) => theme.colors.text.primary};

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

export const Footer = styled.div`
  display: flex;

  justify-content: space-between;

  align-items: center;

  padding-top: 6px;
`;

export const MemberCount = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;

export const Button = styled.button`
  padding: 8px 14px;

  border-radius: ${({ theme }) => theme.radius.md};

  background: ${({ theme }) => theme.colors.primary.main};

  color: ${({ theme }) => theme.colors.primary.contrast};

  font-size: 13px;

  font-weight: ${({ theme }) => theme.typography.weights.semibold};

  transition: ${({ theme }) => theme.animation.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
  }
`;
