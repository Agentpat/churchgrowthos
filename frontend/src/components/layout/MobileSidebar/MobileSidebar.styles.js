import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;

  inset: 0;

  z-index: 900;

  background: rgba(15, 23, 42, 0.45);

  backdrop-filter: blur(6px);

  opacity: ${({ open }) => (open ? 1 : 0)};

  visibility: ${({ open }) => (open ? "visible" : "hidden")};

  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
`;

export const Drawer = styled.aside`
  position: fixed;

  top: 0;

  left: 0;

  z-index: 1000;

  width: 280px;

  height: 100vh;

  padding: ${({ theme }) => theme.spacing.lg};

  padding-top: 80px;

  background: rgba(255, 255, 255, 0.75);

  backdrop-filter: ${({ theme }) => theme.glass.blur};

  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};

  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  overflow-y: auto;
`;

export const CloseButton = styled.button`
  position: absolute;

  top: 20px;

  right: 20px;

  z-index: 20;

  width: 40px;

  height: 40px;

  display: flex;

  align-items: center;

  justify-content: center;

  border: none;

  cursor: pointer;

  border-radius: ${({ theme }) => theme.radius.md};

  background: rgba(255, 255, 255, 0.5);

  color: ${({ theme }) => theme.colors.text.primary};

  transition: ${({ theme }) => theme.animation.fast};

  &:hover {
    background: rgba(37, 99, 235, 0.12);

    color: ${({ theme }) => theme.colors.primary.main};
  }
`;
