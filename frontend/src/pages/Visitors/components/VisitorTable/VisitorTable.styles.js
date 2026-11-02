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

  min-width: 1050px;

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

  color: ${({ theme }) => theme.colors.text.primary};

  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;

export const VisitorInfo = styled.div`
  display: flex;

  align-items: center;

  gap: 12px;
`;

export const Avatar = styled.div`
  width: 40px;

  height: 40px;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  background: ${({ theme }) => theme.colors.primary.main};

  color: white;

  font-weight: bold;

  flex-shrink: 0;
`;

export const StatusBadge = styled.span`
  display: inline-flex;

  padding: 6px 12px;

  border-radius: 20px;

  font-size: 12px;

  font-weight: 600;

  background: ${({ status }) => {
    switch (status) {
      case "NEW":
        return "rgba(59,130,246,.15)";

      case "CONTACTED":
        return "rgba(245,158,11,.15)";

      case "FOLLOWING_UP":
        return "rgba(168,85,247,.15)";

      case "CONNECTED":
        return "rgba(34,197,94,.15)";

      case "CONVERTED":
        return "rgba(22,163,74,.15)";

      default:
        return "rgba(239,68,68,.15)";
    }
  }};

  color: ${({ status }) => {
    switch (status) {
      case "NEW":
        return "#2563eb";

      case "CONTACTED":
        return "#d97706";

      case "FOLLOWING_UP":
        return "#9333ea";

      case "CONNECTED":
        return "#16a34a";

      case "CONVERTED":
        return "#15803d";

      default:
        return "#dc2626";
    }
  }};
`;

export const FollowUpBadge = styled(StatusBadge)`
  background: rgba(37, 99, 235, 0.1);

  color: #2563eb;
`;

export const ActionButton = styled.button`
  display: flex;

  align-items: center;

  gap: 8px;

  padding: 8px 14px;

  border: none;

  border-radius: ${({ theme }) => theme.radius.md};

  background: rgba(37, 99, 235, 0.1);

  color: ${({ theme }) => theme.colors.primary.main};

  cursor: pointer;

  transition: ${({ theme }) => theme.animation.fast};

  &:hover {
    background: rgba(37, 99, 235, 0.18);
  }
`;

export const EmptyState = styled.div`
  padding: 50px;

  text-align: center;

  color: ${({ theme }) => theme.colors.text.secondary};
`;
