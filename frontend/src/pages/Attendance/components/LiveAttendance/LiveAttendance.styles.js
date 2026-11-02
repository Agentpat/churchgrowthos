import styled from "styled-components";

// =====================================
// Container
// =====================================

export const Container = styled.section`
  width: 100%;
  min-width: 0;

  display: flex;
  flex-direction: column;

  gap: 18px;

  @media (max-width: 768px) {
    gap: 11px;
  }

  @media (max-width: 480px) {
    gap: 9px;
  }
`;

// =====================================
// Header
// =====================================

export const Header = styled.div`
  width: 100%;
  min-width: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 24px;

  padding: 20px 22px;

  background: #ffffff;

  border: 1px solid rgba(15, 23, 42, 0.08);

  border-radius: 16px;

  box-shadow: 0 4px 18px rgba(15, 23, 42, 0.035);

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;

    align-items: stretch;
    justify-content: flex-start;

    gap: 9px;

    padding: 12px;

    border-radius: 12px;
  }

  @media (max-width: 480px) {
    gap: 8px;

    padding: 10px;
  }
`;

// =====================================
// Header Content
// =====================================

export const HeaderContent = styled.div`
  width: 100%;
  min-width: 0;

  flex: 1;

  display: flex;
  flex-direction: column;

  gap: 4px;

  @media (max-width: 768px) {
    flex: none;

    width: 100%;
  }
`;

// =====================================
// Eyebrow
// =====================================

export const Eyebrow = styled.span`
  display: block;

  color: #2563eb;

  font-size: 9px;
  line-height: 1;

  font-weight: 750;

  letter-spacing: 0.08em;

  text-transform: uppercase;

  @media (max-width: 480px) {
    font-size: 7px;
  }
`;

// =====================================
// Title Row
// =====================================

export const TitleRow = styled.div`
  width: 100%;
  min-width: 0;

  display: flex;
  align-items: center;

  gap: 7px;

  flex-wrap: nowrap;

  @media (max-width: 480px) {
    gap: 6px;
  }
`;

// =====================================
// Title
// =====================================

export const Title = styled.h2`
  min-width: 0;

  margin: 0;

  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;

  color: #0f172a;

  font-size: 19px;

  line-height: 1.15;

  font-weight: 750;

  letter-spacing: -0.025em;

  @media (max-width: 768px) {
    font-size: 15px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

// =====================================
// Status
// =====================================

export const Status = styled.span`
  flex-shrink: 0;

  display: inline-flex;

  align-items: center;

  gap: 4px;

  min-height: 19px;

  padding: 3px 7px;

  border-radius: 999px;

  border: 1px solid;

  font-size: 8px;

  line-height: 1;

  font-weight: 700;

  ${({ $type }) => {
    switch ($type) {
      case "live":
        return `
          color: #047857;
          background: rgba(16, 185, 129, 0.07);
          border-color: rgba(16, 185, 129, 0.15);
        `;

      case "closed":
        return `
          color: #b45309;
          background: rgba(245, 158, 11, 0.07);
          border-color: rgba(245, 158, 11, 0.15);
        `;

      default:
        return `
          color: #64748b;
          background: rgba(100, 116, 139, 0.055);
          border-color: rgba(100, 116, 139, 0.12);
        `;
    }
  }}

  @media (max-width: 480px) {
    min-height: 17px;

    padding: 3px 6px;

    font-size: 7px;
  }
`;

// =====================================
// Status Dot
// =====================================

export const StatusDot = styled.span`
  width: 5px;
  height: 5px;

  flex-shrink: 0;

  display: inline-flex;

  align-items: center;
  justify-content: center;

  font-size: 0;

  svg {
    width: 4px;
    height: 4px;
  }
`;

// =====================================
// Status Text
// =====================================

export const StatusText = styled.span`
  white-space: nowrap;
`;

// =====================================
// Service Meta
// =====================================

export const ServiceMeta = styled.div`
  min-width: 0;

  display: flex;
  align-items: center;

  gap: 7px;

  margin-top: 1px;
`;

// =====================================
// Service Date
// =====================================

export const ServiceDate = styled.span`
  color: #64748b;

  font-size: 10px;

  line-height: 1.3;

  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 8px;
  }
`;

// =====================================
// Live Badge
// =====================================

export const LiveBadge = styled.span`
  display: inline-flex;

  align-items: center;

  gap: 4px;

  color: #047857;

  font-size: 8px;

  font-weight: 650;

  svg {
    font-size: 4px;
  }
`;

// =====================================
// Scan Action
// =====================================

export const ScanAction = styled.button`
  flex-shrink: 0;

  min-width: 150px;

  min-height: 38px;

  display: inline-flex;

  align-items: center;
  justify-content: center;

  gap: 7px;

  padding: 0 15px;

  border: none;

  border-radius: 9px;

  background: #2563eb;

  color: #ffffff;

  font-family: inherit;

  font-size: 10px;

  font-weight: 700;

  cursor: pointer;

  transition:
    transform 160ms ease,
    box-shadow 160ms ease,
    opacity 160ms ease;

  svg {
    font-size: 10px;
  }

  &:hover:not(:disabled) {
    transform: translateY(-1px);

    box-shadow: 0 5px 14px rgba(37, 99, 235, 0.18);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.45;

    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 100%;

    min-width: 0;

    min-height: 32px;

    padding: 0 10px;

    border-radius: 8px;

    font-size: 9px;
  }

  @media (max-width: 480px) {
    min-height: 30px;

    font-size: 8px;

    svg {
      font-size: 9px;
    }
  }
`;

// =====================================
// Stats
// =====================================

export const Stats = styled.div`
  width: 100%;

  display: grid;

  grid-template-columns: repeat(3, minmax(0, 1fr));

  gap: 14px;

  @media (max-width: 768px) {
    gap: 7px;
  }

  @media (max-width: 480px) {
    gap: 5px;
  }
`;

// =====================================
// Stat
// =====================================

export const Stat = styled.div`
  min-width: 0;

  display: flex;
  align-items: center;

  gap: 10px;

  padding: 14px;

  background: #ffffff;

  border: 1px solid rgba(15, 23, 42, 0.08);

  border-radius: 13px;

  @media (max-width: 768px) {
    min-height: 58px;

    gap: 7px;

    padding: 8px;

    border-radius: 9px;
  }

  @media (max-width: 480px) {
    min-height: 53px;

    gap: 5px;

    padding: 7px;

    border-radius: 8px;
  }
`;

// =====================================
// Stat Icon
// =====================================

export const StatIcon = styled.div`
  width: 32px;
  height: 32px;

  flex-shrink: 0;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 8px;

  background: rgba(37, 99, 235, 0.08);

  color: #2563eb;

  font-size: 12px;

  @media (max-width: 768px) {
    width: 25px;
    height: 25px;

    border-radius: 6px;

    font-size: 9px;
  }

  @media (max-width: 480px) {
    width: 22px;
    height: 22px;

    font-size: 8px;
  }
`;

// =====================================
// Stat Content
// =====================================

export const StatContent = styled.div`
  min-width: 0;

  display: flex;

  flex-direction: column;

  gap: 1px;
`;

// =====================================
// Stat Label
// =====================================

export const StatLabel = styled.span`
  color: #94a3b8;

  font-size: 8px;

  line-height: 1.1;

  font-weight: 700;

  text-transform: uppercase;

  letter-spacing: 0.04em;

  @media (max-width: 768px) {
    font-size: 6px;
  }
`;

// =====================================
// Stat Value
// =====================================

export const StatValue = styled.strong`
  color: #0f172a;

  font-size: 20px;

  line-height: 1;

  font-weight: 750;

  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 15px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

// =====================================
// Stat Subtext
// =====================================

export const StatSubtext = styled.span`
  color: #94a3b8;

  font-size: 8px;

  line-height: 1.1;

  white-space: nowrap;

  overflow: hidden;

  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 6px;
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

// =====================================
// Main
// =====================================

export const Main = styled.div`
  width: 100%;
  min-width: 0;
`;

// =====================================
// Recent Section
// =====================================

export const RecentSection = styled.div`
  width: 100%;

  overflow: hidden;

  background: #ffffff;

  border: 1px solid rgba(15, 23, 42, 0.08);

  border-radius: 14px;

  box-shadow: 0 3px 14px rgba(15, 23, 42, 0.025);

  @media (max-width: 768px) {
    border-radius: 10px;
  }
`;

// =====================================
// Section Header
// =====================================

export const SectionHeader = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-between;

  padding: 14px 16px;

  border-bottom: 1px solid rgba(15, 23, 42, 0.055);

  @media (max-width: 768px) {
    padding: 9px 11px;
  }
`;

// =====================================
// Section Title
// =====================================

export const SectionTitle = styled.h3`
  margin: 0;

  color: #0f172a;

  font-size: 13px;

  line-height: 1.2;

  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 9px;
  }
`;

// =====================================
// Section Description
// =====================================

export const SectionDescription = styled.p`
  margin: 3px 0 0;

  color: #94a3b8;

  font-size: 9px;

  line-height: 1.3;

  @media (max-width: 768px) {
    margin-top: 2px;

    font-size: 6px;
  }
`;

// =====================================
// Check-in List
// =====================================

export const CheckInList = styled.div`
  width: 100%;

  display: flex;

  flex-direction: column;
`;

// =====================================
// Check-in Row
// =====================================

export const CheckInRow = styled.div`
  width: 100%;

  min-width: 0;

  display: flex;

  align-items: center;
  justify-content: space-between;

  gap: 10px;

  padding: 11px 16px;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(15, 23, 42, 0.055);
  }

  @media (max-width: 768px) {
    min-height: 36px;

    padding: 7px 10px;

    gap: 6px;
  }

  @media (max-width: 480px) {
    min-height: 33px;

    padding: 6px 9px;
  }
`;

// =====================================
// Member
// =====================================

export const Member = styled.div`
  min-width: 0;

  flex: 1;

  display: flex;

  align-items: center;

  gap: 8px;

  @media (max-width: 768px) {
    gap: 6px;
  }
`;

// =====================================
// Member Avatar
// =====================================

export const MemberAvatar = styled.div`
  width: 30px;
  height: 30px;

  flex-shrink: 0;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: rgba(37, 99, 235, 0.09);

  color: #2563eb;

  font-size: 8px;

  font-weight: 750;

  @media (max-width: 768px) {
    width: 23px;
    height: 23px;

    font-size: 6px;
  }
`;

// =====================================
// Member Info
// =====================================

export const MemberInfo = styled.div`
  min-width: 0;

  display: flex;

  flex-direction: column;

  gap: 1px;
`;

// =====================================
// Member Name
// =====================================

export const MemberName = styled.span`
  max-width: 220px;

  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;

  color: #334155;

  font-size: 10px;

  line-height: 1.15;

  font-weight: 650;

  @media (max-width: 768px) {
    max-width: 140px;

    font-size: 8px;
  }

  @media (max-width: 480px) {
    max-width: 120px;

    font-size: 7px;
  }
`;

// =====================================
// Member Meta
// =====================================

export const MemberMeta = styled.span`
  color: #94a3b8;

  font-size: 7px;

  line-height: 1.1;

  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 5px;
  }
`;

// =====================================
// Check-in Details
// =====================================

export const CheckInDetails = styled.div`
  flex-shrink: 0;

  display: flex;

  align-items: center;

  gap: 10px;

  @media (max-width: 768px) {
    gap: 5px;
  }
`;

// =====================================
// Check-in Method
// =====================================

export const CheckInMethod = styled.span`
  color: #64748b;

  font-size: 8px;

  font-weight: 600;

  @media (max-width: 768px) {
    display: none;
  }
`;

// =====================================
// Check-in Time
// =====================================

export const CheckInTime = styled.span`
  display: inline-flex;

  align-items: center;

  gap: 3px;

  color: #475569;

  font-size: 8px;

  font-weight: 600;

  svg {
    font-size: 7px;
  }

  @media (max-width: 768px) {
    font-size: 6px;

    svg {
      font-size: 5px;
    }
  }
`;

// =====================================
// Empty State
// =====================================

export const EmptyState = styled.div`
  min-height: 180px;

  display: flex;

  flex-direction: column;

  align-items: center;
  justify-content: center;

  padding: 25px;

  text-align: center;

  @media (max-width: 768px) {
    min-height: 120px;

    padding: 18px;
  }
`;

// =====================================
// Empty Icon
// =====================================

export const EmptyIcon = styled.div`
  width: 38px;
  height: 38px;

  display: flex;

  align-items: center;
  justify-content: center;

  margin-bottom: 8px;

  border-radius: 10px;

  background: rgba(37, 99, 235, 0.08);

  color: #2563eb;

  font-size: 14px;
`;

// =====================================
// Empty Title
// =====================================

export const EmptyTitle = styled.h4`
  margin: 0;

  color: #64748b;

  font-size: 11px;

  font-weight: 700;
`;

// =====================================
// Empty Description
// =====================================

export const EmptyDescription = styled.p`
  max-width: 260px;

  margin: 4px 0 0;

  color: #94a3b8;

  font-size: 8px;

  line-height: 1.4;
`;
