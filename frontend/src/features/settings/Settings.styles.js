import styled from "styled-components";

export const SettingsLayout = styled.div`
  width: 100%;

  max-width: 1400px;

  margin: 0 auto;

  padding: 28px 30px 40px;

  box-sizing: border-box;

  @media (max-width: 900px) {
    padding: 24px 20px 32px;
  }

  @media (max-width: 600px) {
    padding: 20px 16px 28px;
  }
`;

export const SettingsHeader = styled.div`
  margin-bottom: 28px;
`;

export const SettingsTitle = styled.h1`
  margin: 0 0 7px;

  color: ${({ theme }) => theme.colors?.textPrimary || "#0f172a"};

  font-size: 24px;

  font-weight: 700;

  line-height: 1.2;

  letter-spacing: -0.02em;
`;

export const SettingsDescription = styled.p`
  margin: 0;

  color: ${({ theme }) => theme.colors?.textSecondary || "#64748b"};

  font-size: 13px;

  line-height: 1.6;
`;

export const SettingsContent = styled.div`
  display: grid;

  grid-template-columns:
    220px
    minmax(0, 1fr);

  align-items: start;

  gap: 28px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;

    gap: 20px;
  }
`;

export const SettingsSidebarWrapper = styled.div`
  min-width: 0;
`;
