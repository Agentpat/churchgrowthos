import styled from "styled-components";

export const Sidebar = styled.nav`
  width: 100%;

  display: flex;

  flex-direction: column;

  gap: 4px;
`;

export const SidebarLabel = styled.div`
  margin: 0 0 9px 10px;

  color: #94a3b8;

  font-size: 9px;

  font-weight: 700;

  letter-spacing: 0.12em;
`;

export const SidebarItem = styled.button`
  width: 100%;

  display: flex;

  align-items: center;

  gap: 11px;

  padding: 10px;

  border: 1px solid
    ${({ $active }) => ($active ? "rgba(37, 99, 235, 0.12)" : "transparent")};

  border-radius: 10px;

  background: ${({ $active }) =>
    $active ? "rgba(37, 99, 235, 0.06)" : "transparent"};

  text-align: left;

  cursor: pointer;

  transition:
    background 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background: ${({ $active }) =>
      $active ? "rgba(37, 99, 235, 0.06)" : "#f8fafc"};
  }

  @media (max-width: 800px) {
    width: auto;

    flex: 1;

    min-width: 0;
  }
`;

export const SidebarIcon = styled.div`
  width: 32px;
  height: 32px;

  min-width: 32px;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 8px;

  background: ${({ $active }) =>
    $active ? "rgba(37, 99, 235, 0.1)" : "#f8fafc"};

  color: ${({ $active }) => ($active ? "#2563eb" : "#64748b")};

  font-size: 12px;
`;

export const SidebarText = styled.div`
  min-width: 0;

  display: flex;

  flex-direction: column;

  gap: 2px;

  strong {
    color: #334155;

    font-size: 11px;

    font-weight: 700;

    line-height: 1.3;
  }

  span {
    color: #94a3b8;

    font-size: 9px;

    line-height: 1.3;
  }

  @media (max-width: 800px) {
    span {
      display: none;
    }
  }
`;
