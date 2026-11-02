import styled, { keyframes } from "styled-components";

const spin = keyframes`

    from {

        transform:rotate(0deg);

    }


    to {

        transform:rotate(360deg);

    }

`;

export const LoaderWrapper = styled.div`
  width: 100%;

  min-height: 120px;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  gap: ${({ theme }) => theme.spacing.md};
`;

export const Spinner = styled.div`
  width: ${({ size }) =>
    size === "small" ? "24px" : size === "large" ? "52px" : "36px"};

  height: ${({ size }) =>
    size === "small" ? "24px" : size === "large" ? "52px" : "36px"};

  border-radius: 50%;

  border: 4px solid rgba(37, 99, 235, 0.15);

  border-top-color: ${({ theme }) => theme.colors.primary.main};

  animation: ${spin} 0.8s linear infinite;
`;

export const LoaderText = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;
