import styled from "styled-components";

// =====================================
// Header
// =====================================

export const Header = styled.header`
  width: 100%;

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 44px;

  padding: 24px 28px;

  background: ${({ theme }) => theme.colors?.surface?.default || "#ffffff"};

  border: 1px solid rgba(15, 23, 42, 0.07);

  border-radius: 16px;

  box-shadow: 0 4px 18px rgba(15, 23, 42, 0.035);

  transition:
    border-color 160ms ease,
    box-shadow 160ms ease;

  &:focus-within {
    border-color: rgba(37, 99, 235, 0.14);
  }

  /* ===================================
     Tablet
  =================================== */

  @media (max-width: 900px) and (min-width: 769px) {
    gap: 28px;

    padding: 20px 22px;
  }

  /* ===================================
     Mobile
  =================================== */

  @media (max-width: 768px) {
    display: flex;

    flex-direction: column;

    align-items: stretch;

    gap: 12px;

    padding: 13px 14px;

    border-radius: 12px;
  }

  @media (max-width: 480px) {
    gap: 10px;

    padding: 12px;

    border-radius: 11px;
  }
`;

// =====================================
// Header Main
// =====================================

export const HeaderMain = styled.div`
  min-width: 0;

  flex: 1;

  display: flex;

  flex-direction: column;

  gap: 5px;

  @media (max-width: 768px) {
    gap: 3px;
  }
`;

// =====================================
// Eyebrow
// =====================================

export const Eyebrow = styled.span`
  display: block;

  margin-bottom: 2px;

  color: ${({ theme }) => theme.colors?.primary?.main || "#2563eb"};

  font-size: 9px;

  line-height: 1;

  font-weight: 700;

  letter-spacing: 0.085em;

  text-transform: uppercase;

  @media (max-width: 480px) {
    font-size: 8px;
  }
`;

// =====================================
// Title Row
// =====================================

export const TitleRow = styled.div`
  min-width: 0;

  display: flex;

  align-items: center;

  flex-wrap: nowrap;

  gap: 9px;

  @media (max-width: 768px) {
    gap: 7px;
  }
`;

// =====================================
// Title
// =====================================

export const Title = styled.h1`
  min-width: 0;

  margin: 0;

  color: ${({ theme }) => theme.colors?.text?.primary || "#0f172a"};

  font-size: 22px;

  line-height: 1.2;

  font-weight: 750;

  letter-spacing: -0.025em;

  @media (max-width: 900px) and (min-width: 769px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 17px;
  }
`;

// =====================================
// Description
// =====================================

export const Description = styled.p`
  max-width: 560px;

  margin: 2px 0 0;

  color: ${({ theme }) => theme.colors?.text?.secondary || "#64748b"};

  font-size: 12px;

  line-height: 1.5;

  font-weight: 400;

  @media (max-width: 768px) {
    margin-top: 1px;

    max-width: 500px;

    font-size: 11px;

    line-height: 1.4;
  }

  @media (max-width: 480px) {
    max-width: 300px;

    font-size: 9px;

    line-height: 1.35;
  }
`;

// =====================================
// Service Row
// =====================================

export const ServiceRow = styled.div`
  min-width: 0;

  display: flex;

  align-items: center;

  margin-top: 7px;

  @media (max-width: 768px) {
    margin-top: 5px;
  }

  @media (max-width: 480px) {
    margin-top: 4px;
  }
`;

// =====================================
// Service Info
// =====================================

export const ServiceInfo = styled.div`
  min-width: 0;

  display: flex;

  align-items: baseline;

  flex-wrap: nowrap;

  gap: 7px;
`;

// =====================================
// Service Label
// =====================================

export const ServiceLabel = styled.span`
  flex-shrink: 0;

  color: ${({ theme }) => theme.colors?.text?.muted || "#94a3b8"};

  font-size: 10px;

  line-height: 1.3;

  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 9px;
  }

  @media (max-width: 480px) {
    font-size: 8px;
  }
`;

// =====================================
// Service Title
// =====================================

export const ServiceTitle = styled.span`
  min-width: 0;

  max-width: 460px;

  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;

  color: ${({ theme }) => theme.colors?.text?.primary || "#334155"};

  font-size: 11px;

  line-height: 1.4;

  font-weight: 650;

  span {
    color: ${({ theme }) => theme.colors?.text?.muted || "#94a3b8"};

    font-weight: 500;
  }

  @media (max-width: 900px) and (min-width: 769px) {
    max-width: 350px;
  }

  @media (max-width: 768px) {
    max-width: 360px;

    font-size: 10px;
  }

  @media (max-width: 480px) {
    max-width: 245px;

    font-size: 9px;
  }

  @media (max-width: 360px) {
    max-width: 190px;
  }
`;

// =====================================
// Status
// =====================================

export const Status = styled.div`
  flex-shrink: 0;

  display: inline-flex;

  align-items: center;

  gap: 4px;

  min-height: 21px;

  padding: 3px 8px;

  border-radius: 999px;

  border: 1px solid;

  font-size: 9px;

  line-height: 1;

  font-weight: 650;

  ${({ $type }) => {
    switch ($type) {
      case "success":
        return `
          color: #047857;

          background:
            rgba(16, 185, 129, 0.07);

          border-color:
            rgba(16, 185, 129, 0.15);
        `;

      case "warning":
        return `
          color: #b45309;

          background:
            rgba(245, 158, 11, 0.07);

          border-color:
            rgba(245, 158, 11, 0.15);
        `;

      case "muted":
        return `
          color: #64748b;

          background:
            rgba(100, 116, 139, 0.06);

          border-color:
            rgba(100, 116, 139, 0.12);
        `;

      default:
        return `
          color: #64748b;

          background:
            rgba(100, 116, 139, 0.05);

          border-color:
            rgba(100, 116, 139, 0.11);
        `;
    }
  }}

  @media (max-width: 480px) {
    min-height: 18px;

    padding: 3px 6px;

    font-size: 8px;
  }
`;

// =====================================
// Status Dot
// =====================================

export const StatusDot = styled.span`
  width: 5px;

  height: 5px;

  flex-shrink: 0;

  display: inline-flex;

  align-items: center;

  justify-content: center;

  font-size: 0;

  line-height: 0;

  svg {
    width: 4px;

    height: 4px;
  }
`;

// =====================================
// Status Text
// =====================================

export const StatusText = styled.span`
  white-space: nowrap;
`;

// =====================================
// Actions
// =====================================

export const Actions = styled.div`
  flex-shrink: 0;

  display: flex;

  align-items: center;

  gap: 10px;

  @media (max-width: 900px) and (min-width: 769px) {
    gap: 8px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    gap: 6px;
  }
`;

// =====================================
// Primary Action
// =====================================

export const PrimaryAction = styled.div`
  flex-shrink: 0;

  width: 142px;

  button {
    width: 100%;

    min-height: 38px;

    padding: 0 14px;

    border-radius: 9px;

    display: inline-flex;

    align-items: center;

    justify-content: center;

    gap: 7px;

    font-size: 11px;

    font-weight: 700;

    box-shadow: none;

    transition:
      transform 160ms ease,
      box-shadow 160ms ease,
      opacity 160ms ease;

    svg {
      font-size: 11px;
    }

    &:not(:disabled):hover {
      transform: translateY(-1px);
    }

    &:not(:disabled):active {
      transform: translateY(0);
    }
  }

  @media (max-width: 900px) and (min-width: 769px) {
    width: 126px;
  }

  @media (max-width: 768px) {
    flex: 1;

    width: auto;

    min-width: 0;

    button {
      width: 100%;

      min-height: 34px;

      padding: 0 12px;

      font-size: 10px;

      svg {
        font-size: 10px;
      }
    }
  }
`;

// =====================================
// Secondary Action
// =====================================

export const SecondaryAction = styled.div`
  flex-shrink: 0;

  width: 142px;

  button {
    width: 100%;

    min-height: 38px;

    padding: 0 14px;

    border-radius: 9px;

    display: inline-flex;

    align-items: center;

    justify-content: center;

    gap: 7px;

    font-size: 11px;

    font-weight: 700;

    box-shadow: none;

    transition:
      transform 160ms ease,
      box-shadow 160ms ease,
      opacity 160ms ease;

    svg {
      font-size: 11px;
    }

    &:not(:disabled):hover {
      transform: translateY(-1px);
    }

    &:not(:disabled):active {
      transform: translateY(0);
    }
  }

  @media (max-width: 900px) and (min-width: 769px) {
    width: 126px;
  }

  @media (max-width: 768px) {
    flex: 1;

    width: auto;

    min-width: 0;

    button {
      width: 100%;

      min-height: 34px;

      padding: 0 12px;

      font-size: 10px;

      svg {
        font-size: 10px;
      }
    }
  }
`;
