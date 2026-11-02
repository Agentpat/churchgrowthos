import styled from "styled-components";

export const GaugeContainer = styled.div`
  position: relative;

  width: 220px;

  height: 220px;

  display: flex;

  flex-direction: column;

  justify-content: center;

  align-items: center;
`;

export const Circle = styled.svg.attrs({
  viewBox: "0 0 180 180",
})`
  width: 220px;

  height: 220px;

  transform: rotate(-90deg);
`;

export const ProgressCircle = styled.circle.attrs({
  cx: 90,

  cy: 90,

  fill: "transparent",

  strokeWidth: 14,
})`
  stroke: ${({ theme }) => theme.colors.primary.main};

  stroke-linecap: round;

  transition: stroke-dashoffset 0.8s ease;
`;

export const Score = styled.div`
  position: absolute;

  top: 75px;

  font-size: ${({ theme }) => theme.typography.sizes.xxxl};

  font-weight: ${({ theme }) => theme.typography.weights.bold};

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Status = styled.div`
  position: absolute;

  top: 125px;

  font-size: ${({ theme }) => theme.typography.sizes.md};

  color: ${({ theme }) => theme.colors.text.secondary};

  font-weight: ${({ theme }) => theme.typography.weights.medium};
`;
