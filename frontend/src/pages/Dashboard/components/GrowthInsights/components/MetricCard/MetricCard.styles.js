import styled from "styled-components";

export const Card = styled.div`
  padding: ${({ theme }) => theme.spacing.md};

  border-radius: ${({ theme }) => theme.radius.lg};

  background: rgba(255, 255, 255, 0.55);

  backdrop-filter: blur(14px);

  border: 1px solid rgba(255, 255, 255, 0.35);

  box-shadow: ${({ theme }) => theme.shadows.sm};

  transition: ${({ theme }) => theme.animation.fast};

  &:hover {
    transform: translateY(-3px);

    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

export const Header = styled.div`
  display: flex;

  justify-content: space-between;

  align-items: center;
`;

export const IconWrapper = styled.div`
  width: 34px;

  height: 34px;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: ${({ theme }) => theme.radius.md};

  background: rgba(37, 99, 235, 0.12);

  color: ${({ theme }) => theme.colors.primary.main};

  font-size: 14px;
`;

export const Title = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.xs};

  color: ${({ theme }) => theme.colors.text.secondary};

  font-weight: ${({ theme }) => theme.typography.weights.medium};
`;

export const Value = styled.h3`
  margin-top: ${({ theme }) => theme.spacing.sm};

  font-size: ${({ theme }) => theme.typography.sizes["2xl"]};

  font-weight: ${({ theme }) => theme.typography.weights.bold};

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Description = styled.span`
  display: block;

  margin-top: 4px;

  font-size: ${({ theme }) => theme.typography.sizes.xs};

  color: ${({ theme }) => theme.colors.text.secondary};
`;
