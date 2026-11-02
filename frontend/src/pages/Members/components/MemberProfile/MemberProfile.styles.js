import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const Avatar = styled.div`
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary.main};
  color: #fff;
  font-size: 28px;
  font-weight: bold;
`;

export const Name = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.xl};
`;

export const StatusBadge = styled.span`
  display: inline-block;
  margin-top: 6px;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  background: ${({ active }) =>
    active ? "rgba(34,197,94,.15)" : "rgba(239,68,68,.15)"};
  color: ${({ active }) => (active ? "#16a34a" : "#dc2626")};
`;

export const EditButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: pointer;
  background: rgba(37, 99, 235, 0.1);
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  transition: 0.2s;

  &:hover {
    background: rgba(37, 99, 235, 0.18);
  }
`;

export const DeactivateButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: pointer;
  background: rgba(239, 68, 68, 0.15);
  color: #dc2626;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  transition: 0.2s;

  &:hover {
    background: rgba(239, 68, 68, 0.25);
  }
`;

export const ReactivateButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: pointer;
  background: rgba(34, 197, 94, 0.15);
  color: #16a34a;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  transition: 0.2s;

  &:hover {
    background: rgba(34, 197, 94, 0.25);
  }
`;

export const CloseButton = styled.button`
  border: none;
  background: transparent;
  font-size: 28px;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.card.background};
  border: ${({ theme }) => theme.card.border};
  border-radius: ${({ theme }) => theme.radius.xl};
`;

export const CardTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const InfoRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const Icon = styled.div`
  color: ${({ theme }) => theme.colors.primary.main};
  margin-top: 4px;
`;

export const Label = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Value = styled.div`
  font-weight: ${({ theme }) => theme.typography.weights.medium};
`;
