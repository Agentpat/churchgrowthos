import styled from "styled-components";

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.surface.default};

  border: 1px solid ${({ theme }) => theme.colors.border.default};

  border-radius: ${({ theme }) => theme.radius.md};

  padding: 18px;

  margin-bottom: 24px;

  box-shadow: ${({ theme }) => theme.shadows.xs};
`;

export const Header = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 16px;

  margin-bottom: 18px;

  flex-wrap: wrap;
`;

export const HeaderLeft = styled.div`
  display: flex;

  align-items: center;

  gap: 12px;
`;

export const IconWrapper = styled.div`
  width: 38px;

  height: 38px;

  border-radius: 10px;

  display: flex;

  align-items: center;

  justify-content: center;

  background: ${({ theme }) => theme.colors.primary.main}12;

  color: ${({ theme }) => theme.colors.primary.main};

  flex-shrink: 0;
`;

export const Title = styled.strong`
  display: block;

  font-size: ${({ theme }) => theme.typography.sizes.md};

  font-weight: ${({ theme }) => theme.typography.weights.bold};

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Description = styled.span`
  display: block;

  margin-top: 3px;

  font-size: ${({ theme }) => theme.typography.sizes.xs};

  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const ClearButton = styled.button`
  display: inline-flex;

  align-items: center;

  gap: 6px;

  border: none;

  background: transparent;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  font-weight: ${({ theme }) => theme.typography.weights.semibold};

  cursor: pointer;

  padding: 6px 8px;

  border-radius: 6px;

  transition: ${({ theme }) => theme.animation.fast};

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.text.primary};

    background: ${({ theme }) => theme.colors.surface.muted};
  }

  &:disabled {
    opacity: 0.5;

    cursor: not-allowed;
  }
`;

export const Controls = styled.div`
  display: grid;

  grid-template-columns:
    minmax(200px, 1fr)
    repeat(2, minmax(160px, 1fr));

  gap: 12px;

  align-items: end;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.div`
  min-width: 0;
`;

export const Label = styled.label`
  display: block;

  margin-bottom: 6px;

  font-size: ${({ theme }) => theme.typography.sizes.xs};

  font-weight: ${({ theme }) => theme.typography.weights.semibold};

  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Select = styled.select`
  width: 100%;

  height: 42px;

  padding: 0 12px;

  border: 1px solid ${({ theme }) => theme.colors.border.default};

  border-radius: ${({ theme }) => theme.radius.sm};

  background: ${({ theme }) => theme.colors.surface.default};

  color: ${({ theme }) => theme.colors.text.primary};

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  outline: none;

  cursor: pointer;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};

    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary.main}15;
  }

  &:disabled {
    opacity: 0.6;

    cursor: not-allowed;
  }
`;

export const DateInput = styled.input`
  width: 100%;

  height: 42px;

  padding: 0 12px;

  box-sizing: border-box;

  border: 1px solid ${({ theme }) => theme.colors.border.default};

  border-radius: ${({ theme }) => theme.radius.sm};

  background: ${({ theme }) => theme.colors.surface.default};

  color: ${({ theme }) => theme.colors.text.primary};

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};

    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary.main}15;
  }

  &:disabled {
    opacity: 0.6;

    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  margin-top: 10px;

  padding: 9px 12px;

  border-radius: ${({ theme }) => theme.radius.sm};

  background: ${({ theme }) => theme.colors.status.danger}10;

  color: ${({ theme }) => theme.colors.status.danger};

  font-size: ${({ theme }) => theme.typography.sizes.xs};

  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

export const Actions = styled.div`
  display: flex;

  justify-content: flex-end;

  margin-top: 14px;
`;

export const ApplyButton = styled.button`
  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 8px;

  min-width: 120px;

  height: 40px;

  padding: 0 16px;

  border: none;

  border-radius: ${({ theme }) => theme.radius.sm};

  background: ${({ theme }) => theme.colors.primary.main};

  color: ${({ theme }) => theme.colors.text.inverse};

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  font-weight: ${({ theme }) => theme.typography.weights.semibold};

  cursor: pointer;

  transition: ${({ theme }) => theme.animation.fast};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primary.dark};
  }

  &:disabled {
    opacity: 0.6;

    cursor: not-allowed;
  }
`;
