import styled from "styled-components";

export const StatCardContainer = styled.div`
  width: 100%;

  padding: ${({ theme }) => theme.spacing.md};

  border-radius: ${({ theme }) => theme.radius.lg};

  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.85),
    rgba(255, 255, 255, 0.55)
  );

  backdrop-filter: blur(18px);

  -webkit-backdrop-filter: blur(18px);

  border: 1px solid rgba(255, 255, 255, 0.45);

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-3px);

    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.1);
  }
`;

export const StatHeader = styled.div`
  display: flex;

  justify-content: space-between;

  align-items: center;
`;

export const StatTitle = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.xs};

  text-transform: uppercase;

  letter-spacing: 0.06em;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

export const StatIcon = styled.div`
  width: 34px;

  height: 34px;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 12px;

  background: linear-gradient(
    135deg,
    rgba(37, 99, 235, 0.16),
    rgba(37, 99, 235, 0.06)
  );

  color: ${({ theme }) => theme.colors.primary.main};

  font-size: 16px;
`;

export const StatValue = styled.h2`
  margin-top: ${({ theme }) => theme.spacing.md};

  font-size: ${({ theme }) => theme.typography.sizes["2xl"]};

  line-height: 1;

  font-weight: ${({ theme }) => theme.typography.weights.bold};

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const StatDescription = styled.p`
  margin-top: ${({ theme }) => theme.spacing.sm};

  font-size: ${({ theme }) => theme.typography.sizes.xs};

  color: ${({ theme }) => theme.colors.text.secondary};

  display: flex;

  align-items: center;

  gap: 5px;
`;
