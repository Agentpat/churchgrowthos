import styled from "styled-components";

export const WelcomeContainer = styled.section`
  width: 100%;

  padding: ${({ theme }) => theme.spacing.xl};

  border-radius: ${({ theme }) => theme.radius.xl};

  background: linear-gradient(
    135deg,
    rgba(37, 99, 235, 0.18),
    rgba(255, 255, 255, 0.85)
  );

  backdrop-filter: blur(20px);

  border: 1px solid rgba(255, 255, 255, 0.45);

  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
`;

export const TopRow = styled.div`
  display: flex;

  justify-content: space-between;

  align-items: center;
`;

export const Badge = styled.span`
  display: inline-flex;

  padding: 6px 14px;

  border-radius: 999px;

  background: rgba(37, 99, 235, 0.12);

  color: ${({ theme }) => theme.colors.primary.main};

  font-size: ${({ theme }) => theme.typography.sizes.xs};

  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

export const DateBox = styled.div`
  display: flex;

  align-items: center;

  gap: 8px;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;

export const WelcomeText = styled.h1`
  margin-top: ${({ theme }) => theme.spacing.lg};

  font-size: ${({ theme }) => theme.typography.sizes["3xl"]};

  color: ${({ theme }) => theme.colors.text.primary};

  font-weight: ${({ theme }) => theme.typography.weights.bold};
`;

export const Subtitle = styled.p`
  margin-top: ${({ theme }) => theme.spacing.sm};

  max-width: 600px;

  color: ${({ theme }) => theme.colors.text.secondary};

  line-height: 1.6;
`;

export const GrowthCard = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};

  display: flex;

  align-items: center;

  gap: 16px;

  padding: 16px;

  border-radius: ${({ theme }) => theme.radius.lg};

  background: rgba(255, 255, 255, 0.55);

  border: 1px solid rgba(255, 255, 255, 0.5);
`;

export const GrowthIcon = styled.div`
  width: 45px;

  height: 45px;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 50%;

  background: rgba(37, 99, 235, 0.12);

  color: ${({ theme }) => theme.colors.primary.main};
`;

export const GrowthText = styled.div`
  display: flex;

  flex-direction: column;

  gap: 4px;

  strong {
    color: ${({ theme }) => theme.colors.text.primary};
  }

  span {
    color: ${({ theme }) => theme.colors.text.secondary};

    font-size: ${({ theme }) => theme.typography.sizes.sm};
  }
`;
