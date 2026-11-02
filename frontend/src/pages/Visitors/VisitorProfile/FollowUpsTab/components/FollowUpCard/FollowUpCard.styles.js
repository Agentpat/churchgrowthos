import styled from "styled-components";

export const Card = styled.div`
  background: ${({ theme }) => theme.card.background};

  border: ${({ theme }) => theme.card.border};

  border-radius: ${({ theme }) => theme.radius.lg};

  padding: ${({ theme }) => theme.spacing.lg};

  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.md};

  transition: ${({ theme }) => theme.animation.fast};

  &:hover {
    transform: translateY(-2px);

    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }
`;

export const Header = styled.div`
  display: flex;

  justify-content: space-between;

  align-items: center;
`;

export const Type = styled.h4`
  margin: 0;

  font-size: ${({ theme }) => theme.typography.sizes.md};

  text-transform: capitalize;

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Badge = styled.span`
  display: inline-flex;

  align-items: center;

  justify-content: center;

  padding: 6px 12px;

  border-radius: 999px;

  font-size: 12px;

  font-weight: 600;

  background: ${({ color }) => `${color}20`};

  color: ${({ color }) => color};
`;

export const Grid = styled.div`
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const Item = styled.div`
  display: flex;

  flex-direction: column;

  gap: 4px;
`;

export const Label = styled.span`
  font-size: 12px;

  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Value = styled.span`
  font-weight: ${({ theme }) => theme.typography.weights.medium};

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Message = styled.div`
  padding: ${({ theme }) => theme.spacing.md};

  border-radius: ${({ theme }) => theme.radius.md};

  background: rgba(0, 0, 0, 0.03);

  line-height: 1.7;

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Actions = styled.div`
  display: flex;

  justify-content: flex-end;

  gap: ${({ theme }) => theme.spacing.md};

  margin-top: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

export const Button = styled.button`
  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 8px;

  padding: 10px 16px;

  border: none;

  border-radius: ${({ theme }) => theme.radius.md};

  cursor: pointer;

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  font-weight: ${({ theme }) => theme.typography.weights.medium};

  transition: ${({ theme }) => theme.animation.fast};

  color: white;

  background: ${({ success, danger, theme }) => {
    if (success) return "#16a34a";

    if (danger) return "#dc2626";

    return theme.colors.primary.main;
  }};

  &:hover {
    opacity: 0.9;

    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;

    cursor: not-allowed;

    transform: none;
  }
`;
