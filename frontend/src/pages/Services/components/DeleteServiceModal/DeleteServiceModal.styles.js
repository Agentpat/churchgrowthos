import styled from "styled-components";

export const Content = styled.div`
  display: flex;

  flex-direction: column;

  align-items: center;

  gap: ${({ theme }) => theme.spacing.md};

  text-align: center;
`;

export const IconWrapper = styled.div`
  width: 52px;

  height: 52px;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: ${({ theme }) => theme.radius.circle};

  background: rgba(220, 38, 38, 0.1);

  color: ${({ theme }) => theme.colors.status.danger};

  font-size: 20px;
`;

export const Message = styled.p`
  margin: 0;

  max-width: 390px;

  color: ${({ theme }) => theme.colors.text.secondary};

  font-size: ${({ theme }) => theme.typography.sizes.sm};

  line-height: 1.6;
`;

export const ServiceName = styled.strong`
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ErrorMessage = styled.div`
  width: 100%;

  box-sizing: border-box;

  padding: 10px 12px;

  border-radius: ${({ theme }) => theme.radius.md};

  background: rgba(220, 38, 38, 0.08);

  border: 1px solid rgba(220, 38, 38, 0.16);

  color: ${({ theme }) => theme.colors.status.danger};

  font-size: ${({ theme }) => theme.typography.sizes.xs};
`;

export const Footer = styled.div`
  width: 100%;

  display: flex;

  justify-content: flex-end;

  gap: ${({ theme }) => theme.spacing.sm};

  padding-top: ${({ theme }) => theme.spacing.sm};

  border-top: 1px solid ${({ theme }) => theme.colors.border.light};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: grid;

    grid-template-columns: repeat(2, 1fr);
  }
`;
