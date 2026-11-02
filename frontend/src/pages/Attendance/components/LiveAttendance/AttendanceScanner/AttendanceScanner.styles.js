import styled from "styled-components";

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 24px;

  background: rgba(15, 23, 42, 0.58);
  backdrop-filter: blur(8px);
`;

export const ScannerCard = styled.div`
  width: min(100%, 520px);
  max-height: calc(100vh - 48px);

  overflow: hidden;

  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 20px;

  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.2);

  display: flex;
  flex-direction: column;
`;

export const ScannerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 20px 22px;

  border-bottom: 1px solid #eef0f3;
`;

export const ScannerTitle = styled.h2`
  margin: 0;

  color: #111827;

  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

export const CloseButton = styled.button`
  width: 36px;
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 0;
  border-radius: 10px;

  background: #f3f4f6;
  color: #6b7280;

  cursor: pointer;

  transition:
    background 0.2s ease,
    color 0.2s ease;

  &:hover {
    background: #e5e7eb;
    color: #111827;
  }
`;

export const ScannerBody = styled.div`
  padding: 24px;

  overflow-y: auto;

  text-align: center;
`;

export const ScannerIcon = styled.div`
  width: 48px;
  height: 48px;

  margin: 0 auto 14px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 14px;

  background: #eff6ff;
  color: #2563eb;

  font-size: 21px;
`;

export const ScannerHeading = styled.h3`
  margin: 0 0 8px;

  color: #111827;

  font-size: 18px;
  font-weight: 700;
`;

export const ScannerDescription = styled.p`
  max-width: 380px;

  margin: 0 auto 22px;

  color: #6b7280;

  font-size: 14px;
  line-height: 1.6;
`;

export const CameraFrame = styled.div`
  position: relative;

  width: 100%;
  max-width: 390px;

  margin: 0 auto;

  overflow: hidden;

  border-radius: 16px;

  background: #0f172a;
`;

export const CameraContainer = styled.div`
  width: 100%;
  min-height: 330px;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;

  video {
    width: 100% !important;
    height: auto !important;
    object-fit: cover;
  }

  img {
    display: none;
  }

  #html5-qrcode-button-camera-permission {
    margin: 16px auto;
  }

  #html5-qrcode-button-camera-start,
  #html5-qrcode-button-camera-stop {
    margin: 12px auto;
    padding: 9px 14px;

    border: 0;
    border-radius: 8px;

    background: #2563eb;
    color: #ffffff;

    font-size: 13px;
    font-weight: 600;

    cursor: pointer;
  }

  #html5-qrcode-anchor-scan-type-change {
    display: none;
  }
`;

export const ResultCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;

  width: 100%;

  padding: 14px;

  border: 1px solid
    ${({ $success }) =>
      $success ? "rgba(34, 197, 94, 0.2)" : "rgba(239, 68, 68, 0.2)"};

  border-radius: 10px;

  background: ${({ $success }) =>
    $success ? "rgba(34, 197, 94, 0.05)" : "rgba(239, 68, 68, 0.05)"};
`;

export const ResultIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 28px;
  height: 28px;
  min-width: 28px;

  border-radius: 50%;

  background: ${({ $error }) =>
    $error ? "rgba(239, 68, 68, 0.1)" : "rgba(34, 197, 94, 0.1)"};

  color: ${({ $error }) => ($error ? "#dc2626" : "#16a34a")};

  font-size: 12px;
`;

export const ResultContent = styled.div`
  min-width: 0;
`;

export const ResultLabel = styled.div`
  margin-bottom: 3px;

  color: #6b7280;

  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

export const ResultValue = styled.div`
  overflow: hidden;

  color: #111827;

  font-size: 14px;
  font-weight: 600;

  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const RetryButton = styled.button`
  margin: 16px auto 0;
  padding: 10px 15px;

  display: inline-flex;
  align-items: center;
  gap: 8px;

  border: 0;
  border-radius: 9px;

  background: #2563eb;
  color: #ffffff;

  font-size: 13px;
  font-weight: 600;

  cursor: pointer;
`;

export const ScannerFooter = styled.div`
  padding: 13px 22px;

  border-top: 1px solid #eef0f3;
`;

export const StatusMessage = styled.div`
  color: #6b7280;

  font-size: 12px;
  text-align: center;
`;
