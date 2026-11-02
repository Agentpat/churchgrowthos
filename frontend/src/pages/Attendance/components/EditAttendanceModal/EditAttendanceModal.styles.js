import styled, { css } from "styled-components";

// =====================================
// Form
// =====================================

export const Form = styled.form`
  width: 100%;

  display: flex;
  flex-direction: column;

  gap: 22px;
`;

// =====================================
// Record Header
// =====================================

export const RecordHeader = styled.div`
  width: 100%;

  padding: 12px 14px;

  border-radius: 10px;

  background: ${({ theme }) =>
    theme.colors?.background?.secondary || "#f8fafc"};

  border: 1px solid
    ${({ theme }) => theme.colors?.border?.light || "rgba(15, 23, 42, 0.06)"};
`;

export const RecordInfo = styled.div`
  min-width: 0;

  display: flex;
  flex-direction: column;

  gap: 3px;
`;

export const MemberName = styled.div`
  margin: 0;

  color: ${({ theme }) => theme.colors?.text?.primary || "#172033"};

  font-size: 14px;

  line-height: 1.35;

  font-weight: ${({ theme }) => theme.typography?.weights?.semibold || 600};

  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;
`;

export const ServiceName = styled.div`
  color: ${({ theme }) => theme.colors?.text?.muted || "#94a3b8"};

  font-size: 11px;

  line-height: 1.35;

  overflow: hidden;

  text-overflow: ellipsis;

  white-space: nowrap;
`;

// =====================================
// Section
// =====================================

export const StatusSection = styled.section`
  width: 100%;
`;

export const SectionLabel = styled.div`
  margin-bottom: 9px;

  color: ${({ theme }) => theme.colors?.text?.secondary || "#64748b"};

  font-size: 11px;

  line-height: 1.3;

  font-weight: ${({ theme }) => theme.typography?.weights?.semibold || 600};
`;

// =====================================
// Status Options
// =====================================

export const StatusOptions = styled.div`
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 8px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const statusColors = {
  present: {
    color: "#16a34a",
    background: "rgba(22, 163, 74, 0.07)",
    border: "rgba(22, 163, 74, 0.30)",
    dot: "#16a34a",
  },

  absent: {
    color: "#dc2626",
    background: "rgba(220, 38, 38, 0.06)",
    border: "rgba(220, 38, 38, 0.25)",
    dot: "#dc2626",
  },

  excused: {
    color: "#d97706",
    background: "rgba(217, 119, 6, 0.06)",
    border: "rgba(217, 119, 6, 0.25)",
    dot: "#d97706",
  },
};

export const StatusOption = styled.button`
  position: relative;

  min-width: 0;

  display: flex;

  align-items: center;

  gap: 9px;

  padding: 11px;

  text-align: left;

  border-radius: 10px;

  border: 1px solid
    ${({ $active, $type, theme }) =>
      $active
        ? statusColors[$type].border
        : theme.colors?.border?.default || "rgba(15, 23, 42, 0.09)"};

  background: ${({ $active, $type, theme }) =>
    $active
      ? statusColors[$type].background
      : theme.colors?.surface?.default || "#ffffff"};

  cursor: pointer;

  outline: none;

  transition:
    border-color 140ms ease,
    background-color 140ms ease,
    transform 140ms ease,
    box-shadow 140ms ease;

  &:hover {
    transform: translateY(-1px);

    border-color: ${({ $type }) => statusColors[$type].border};

    box-shadow: 0 3px 10px rgba(15, 23, 42, 0.05);
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  .radio {
    width: 8px;
    height: 8px;

    flex-shrink: 0;

    margin-left: auto;

    border-radius: 50%;

    background: ${({ $active, $type }) =>
      $active ? statusColors[$type].dot : "transparent"};

    border: 1px solid
      ${({ $active, $type, theme }) =>
        $active
          ? statusColors[$type].dot
          : theme.colors?.border?.default || "#cbd5e1"};
  }

  @media (max-width: 600px) {
    min-height: 52px;

    padding: 10px 12px;
  }
`;

// =====================================
// Status Icon
// =====================================

export const StatusIcon = styled.span`
  width: 28px;
  height: 28px;

  flex-shrink: 0;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 8px;

  color: ${({ $type }) => statusColors[$type].color};

  background: ${({ $active, $type }) =>
    $active ? "rgba(255,255,255,0.75)" : statusColors[$type].background};

  font-size: 12px;
`;

// =====================================
// Status Content
// =====================================

export const StatusContent = styled.div`
  min-width: 0;

  display: flex;
  flex-direction: column;

  gap: 2px;
`;

export const StatusTitle = styled.span`
  color: ${({ theme }) => theme.colors?.text?.primary || "#334155"};

  font-size: 11px;

  line-height: 1.25;

  font-weight: 600;
`;

export const StatusDescription = styled.span`
  color: ${({ theme }) => theme.colors?.text?.muted || "#94a3b8"};

  font-size: 9px;

  line-height: 1.3;

  white-space: nowrap;

  overflow: hidden;

  text-overflow: ellipsis;

  @media (max-width: 600px) {
    font-size: 10px;
  }
`;

// =====================================
// Notes
// =====================================

export const NotesSection = styled.section`
  width: 100%;
`;

export const NotesLabel = styled.div`
  margin-bottom: 8px;

  color: ${({ theme }) => theme.colors?.text?.secondary || "#64748b"};

  font-size: 11px;

  line-height: 1.3;

  font-weight: 600;
`;

export const NotesWrapper = styled.div`
  position: relative;

  width: 100%;
`;

export const NotesIcon = styled.div`
  position: absolute;

  top: 12px;
  left: 12px;

  color: ${({ theme }) => theme.colors?.text?.muted || "#94a3b8"};

  font-size: 11px;

  pointer-events: none;
`;

export const NotesInput = styled.textarea`
  width: 100%;

  min-height: 82px;

  resize: vertical;

  padding: 11px 12px 11px 32px;

  border-radius: 9px;

  border: 1px solid
    ${({ theme }) => theme.colors?.border?.default || "rgba(15, 23, 42, 0.10)"};

  background: ${({ theme }) => theme.colors?.surface?.default || "#ffffff"};

  color: ${({ theme }) => theme.colors?.text?.primary || "#334155"};

  font-family: inherit;

  font-size: 12px;

  line-height: 1.5;

  outline: none;

  transition:
    border-color 140ms ease,
    box-shadow 140ms ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors?.text?.muted || "#94a3b8"};
  }

  &:hover {
    border-color: ${({ theme }) =>
      theme.colors?.border?.default || "rgba(15, 23, 42, 0.16)"};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors?.primary?.main || "#2563eb"};

    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.08);
  }

  @media (max-width: 600px) {
    min-height: 76px;

    resize: none;
  }
`;

// =====================================
// Footer
// =====================================

export const Footer = styled.div`
  display: flex;

  align-items: center;

  justify-content: flex-end;

  gap: 8px;

  padding-top: 16px;

  border-top: 1px solid
    ${({ theme }) => theme.colors?.border?.light || "rgba(15, 23, 42, 0.06)"};

  @media (max-width: 600px) {
    display: grid;

    grid-template-columns: 1fr 1.35fr;

    gap: 8px;

    padding-top: 14px;
  }
`;

// =====================================
// Cancel
// =====================================

export const CancelButton = styled.button`
  height: 38px;

  padding: 0 15px;

  border-radius: 8px;

  border: 1px solid
    ${({ theme }) => theme.colors?.border?.default || "rgba(15, 23, 42, 0.10)"};

  background: ${({ theme }) => theme.colors?.surface?.default || "#ffffff"};

  color: ${({ theme }) => theme.colors?.text?.secondary || "#64748b"};

  font-family: inherit;

  font-size: 11px;

  font-weight: 600;

  cursor: pointer;

  transition:
    background-color 140ms ease,
    border-color 140ms ease;

  &:hover {
    background: ${({ theme }) =>
      theme.colors?.background?.secondary || "#f8fafc"};
  }

  @media (max-width: 600px) {
    width: 100%;

    height: 40px;
  }
`;

// =====================================
// Save
// =====================================

export const SaveButton = styled.button`
  height: 38px;

  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 7px;

  padding: 0 16px;

  border: none;

  border-radius: 8px;

  background: ${({ theme }) => theme.colors?.primary?.main || "#2563eb"};

  color: #ffffff;

  font-family: inherit;

  font-size: 11px;

  font-weight: 600;

  cursor: pointer;

  box-shadow: 0 3px 10px rgba(37, 99, 235, 0.18);

  transition:
    transform 140ms ease,
    box-shadow 140ms ease,
    opacity 140ms ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);

    box-shadow: 0 5px 14px rgba(37, 99, 235, 0.22);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.55;

    cursor: not-allowed;
  }

  svg {
    font-size: 10px;
  }

  @media (max-width: 600px) {
    width: 100%;

    height: 40px;
  }
`;
