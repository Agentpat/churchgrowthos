import styled from "styled-components";

export const TableContainer = styled.div`
  width: 100%;

  overflow-x: auto;

  background: ${({ theme }) => theme.card.background};

  border: ${({ theme }) => theme.card.border};

  border-radius: ${({ theme }) => theme.radius.xl};
`;

export const Table = styled.table`
  width: 100%;

  min-width: 850px;

  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background: rgba(148, 163, 184, 0.08);
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  border-bottom: ${({ theme }) => theme.glass.border};

  transition: ${({ theme }) => theme.animation.fast};

  &:hover {
    background: rgba(37, 99, 235, 0.04);
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const TableHeader = styled.th`
  padding: 16px;

  text-align: left;

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  color: ${({ theme }) => theme.colors.text.secondary};

  font-weight: ${({ theme }) => theme.typography.weights.medium};
`;

export const TableCell = styled.td`
  padding: 16px;

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const MemberInfo = styled.div`
  display: flex;

  align-items: center;

  gap: 12px;

  font-weight: ${({ theme }) => theme.typography.weights.medium};
`;

export const Avatar = styled.div`
  width: 38px;

  height: 38px;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  background: ${({ theme }) => theme.colors.primary.main};

  color: white;

  font-weight: bold;
`;

export const StatusBadge = styled.span`
  padding: 6px 12px;

  border-radius: 20px;

  font-size: ${({ theme }) => theme.typography.sizes.xs};

  background: ${({ active }) =>
    active ? "rgba(34,197,94,.15)" : "rgba(239,68,68,.15)"};

  color: ${({ active }) => (active ? "#16a34a" : "#dc2626")};
`;

export const ActionButton = styled.button`
  display: flex;

  align-items: center;

  gap: 8px;

  padding: 8px 14px;

  border: none;

  border-radius: ${({ theme }) => theme.radius.md};

  cursor: pointer;

  background: rgba(37, 99, 235, 0.1);

  color: ${({ theme }) => theme.colors.primary.main};

  transition: ${({ theme }) => theme.animation.fast};

  &:hover {
    background: rgba(37, 99, 235, 0.18);
  }
`;

export const EmptyState = styled.div`
  padding: 40px;

  text-align: center;

  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const EngagementBadge = styled.span`
  padding: 6px 12px;

  border-radius: 20px;

  font-size: ${({ theme }) => theme.typography.sizes.xs};

  background: rgba(37, 99, 235, 0.12);

  color: ${({ theme }) => theme.colors.primary.main};
`;
