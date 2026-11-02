import styled from "styled-components";

export const PageWrapper = styled.main`
  min-height: 100vh;

  display: flex;

  align-items: center;

  justify-content: center;

  padding: ${({ theme }) => theme.spacing.lg};

  background: radial-gradient(
    circle at top left,
    rgba(37, 99, 235, 0.25),
    transparent 40%
  );
`;

export const LoginCard = styled.div`
  width: 100%;

  max-width: 420px;

  padding: ${({ theme }) => theme.spacing.xl};

  border-radius: ${({ theme }) => theme.radius.xl};

  background: rgba(255, 255, 255, 0.65);

  backdrop-filter: ${({ theme }) => theme.glass.blur};

  border: ${({ theme }) => theme.glass.border};

  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

export const Brand = styled.h2`
  text-align: center;

  color: ${({ theme }) => theme.colors.primary.main};

  font-size: ${({ theme }) => theme.typography.sizes["2xl"]};
`;

export const Title = styled.h1`
  margin-top: ${({ theme }) => theme.spacing.lg};

  text-align: center;

  font-size: ${({ theme }) => theme.typography.sizes["3xl"]};
`;

export const Subtitle = styled.p`
  margin-top: ${({ theme }) => theme.spacing.sm};

  margin-bottom: ${({ theme }) => theme.spacing.xl};

  text-align: center;

  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Form = styled.form`
  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.lg};
`;

export const ErrorBox = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};

  padding: ${({ theme }) => theme.spacing.md};

  border-radius: ${({ theme }) => theme.radius.md};

  background: rgba(239, 68, 68, 0.1);

  color: ${({ theme }) => theme.colors.status.error};
`;
