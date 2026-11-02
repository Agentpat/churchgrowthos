import styled from "styled-components";

export const Container = styled.div`
  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.sm};

  padding: ${({ theme }) => theme.spacing.md};

  border-radius: ${({ theme }) => theme.radius.lg};

  background: rgba(255, 255, 255, 0.45);

  border: ${({ theme }) => theme.glass.border};
`;

export const Header = styled.div`
  display: flex;

  justify-content: space-between;

  align-items: center;
`;

export const Title = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.sm};

  color: ${({ theme }) => theme.colors.text.secondary};

  font-weight: ${({ theme }) => theme.typography.weights.medium};
`;

export const Value = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.md};

  font-weight: ${({ theme }) => theme.typography.weights.bold};

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ProgressWrapper = styled.div`
  width: 100%;

  height: 8px;

  background: rgba(148, 163, 184, 0.25);

  border-radius: 20px;

  overflow: hidden;
`;

export const ProgressBar = styled.div.attrs({
  style: (props) => ({
    width: `${props.value}%`,
  }),
})`
  height: 100%;

  border-radius: 20px;

  background: ${({ theme }) => theme.colors.primary.main};

  transition: width 0.6s ease;
`;

export const Status = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.xs};

  color: ${({ theme }) => theme.colors.text.secondary};
`;
