import styled from "styled-components";

export const Timeline = styled.div`
  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.lg};
`;

export const TimelineItem = styled.div`
  display: flex;

  position: relative;

  gap: ${({ theme }) => theme.spacing.md};
`;

export const IconWrapper = styled.div`
  width: 40px;

  height: 40px;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  background: rgba(37, 99, 235, 0.12);

  color: ${({ theme }) => theme.colors.primary.main};

  flex-shrink: 0;
`;

export const Line = styled.div`
  position: absolute;

  left: 20px;

  top: 40px;

  width: 2px;

  height: calc(100% + 16px);

  background: rgba(0, 0, 0, 0.1);
`;

export const Content = styled.div`
  display: flex;

  flex-direction: column;

  gap: 6px;
`;

export const ActivityTitle = styled.h4`
  margin: 0;
`;

export const ActivityDescription = styled.p`
  margin: 0;

  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const DateText = styled.span`
  font-size: 12px;

  color: ${({ theme }) => theme.colors.text.secondary};
`;
