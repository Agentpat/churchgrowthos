import styled from "styled-components";

export const Container = styled.section`
  width: 100%;

  margin-top: 32px;
`;

export const Header = styled.div`
  margin-bottom: 20px;
`;

export const Title = styled.h3`
  font-size: 20px;

  font-weight: 700;

  color: #111827;

  margin: 0;
`;

export const MetricsGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const MetricCard = styled.div`
  background: #ffffff;

  border-radius: 16px;

  padding: 20px;

  display: flex;

  align-items: center;

  gap: 16px;

  border: 1px solid #e5e7eb;

  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-3px);

    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  }
`;

export const IconWrapper = styled.div`
  width: 48px;

  height: 48px;

  border-radius: 12px;

  display: flex;

  align-items: center;

  justify-content: center;

  background: #eef2ff;

  color: #4f46e5;

  font-size: 20px;
`;

export const Content = styled.div`
  display: flex;

  flex-direction: column;

  gap: 4px;
`;

export const Label = styled.span`
  font-size: 13px;

  color: #6b7280;

  font-weight: 500;
`;

export const Value = styled.h4`
  font-size: 26px;

  font-weight: 700;

  color: #111827;

  margin: 0;
`;

export const Description = styled.span`
  font-size: 12px;

  color: #9ca3af;
`;
export const ProgressContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};

  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.sm};
`;

export const ProgressBar = styled.div`
  width: 100%;

  height: 12px;

  border-radius: 999px;

  overflow: hidden;

  background: rgba(148, 163, 184, 0.18);
`;

export const ProgressFill = styled.div`
  height: 100%;

  border-radius: inherit;

  background: linear-gradient(90deg, #22c55e, #3b82f6);

  transition: width 0.4s ease;
`;

export const StatusBadge = styled.div`
  padding: 8px 14px;

  border-radius: 999px;

  background: rgba(34, 197, 94, 0.12);

  color: #22c55e;

  font-size: 13px;

  font-weight: 600;
`;
