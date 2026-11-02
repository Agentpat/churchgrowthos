import styled from "styled-components";

export const MembersContainer = styled.section`
  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.xl};

  padding: ${({ theme }) => theme.spacing.xl};
`;

export const Header = styled.div`
  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;

    align-items: flex-start;
  }
`;

export const HeaderContent = styled.div`
  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.sizes.xxxl};

  font-weight: ${({ theme }) => theme.typography.weights.bold};

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.md};

  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const AddButton = styled.button`
  display: flex;

  align-items: center;

  justify-content: center;

  gap: ${({ theme }) => theme.spacing.sm};

  padding: 12px 20px;

  border: none;

  border-radius: ${({ theme }) => theme.radius.md};

  background: ${({ theme }) => theme.colors.primary.main};

  color: white;

  font-weight: ${({ theme }) => theme.typography.weights.medium};

  cursor: pointer;

  transition: ${({ theme }) => theme.animation.fast};

  &:hover {
    opacity: 0.9;

    transform: translateY(-1px);
  }

  svg {
    font-size: 16px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

export const Content = styled.div`
  display: flex;

  flex-direction: column;

  gap: ${({ theme }) => theme.spacing.xl};
`;

export const ErrorBox = styled.div`
  width: 100%;

  padding: ${({ theme }) => theme.spacing.md};

  border-radius: ${({ theme }) => theme.radius.md};

  background: rgba(239, 68, 68, 0.1);

  border: 1px solid rgba(239, 68, 68, 0.25);

  color: ${({ theme }) => theme.colors.status.error};

  text-align: center;

  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;
