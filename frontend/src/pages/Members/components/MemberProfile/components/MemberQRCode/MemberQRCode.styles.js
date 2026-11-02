import styled from "styled-components";

export const QRCard = styled.div`
    grid-column: 1 / -1;

    padding: ${({ theme }) =>
        theme.spacing.lg};

    border: ${({ theme }) =>
        theme.card.border};

    border-radius: ${({ theme }) =>
        theme.radius.xl};

    background: ${({ theme }) =>
        theme.card.background};
`;

export const QRHeader = styled.div`
    display: flex;

    align-items: center;
    justify-content: space-between;

    margin-bottom: ${({ theme }) =>
        theme.spacing.lg};
`;

export const QRTitleGroup = styled.div`
    display: flex;

    align-items: center;

    gap: 10px;
`;

export const QRIcon = styled.div`
    width: 34px;
    height: 34px;

    min-width: 34px;

    display: flex;

    align-items: center;
    justify-content: center;

    border-radius: 9px;

    background:
        rgba(
            37,
            99,
            235,
            0.08
        );

    color: #2563eb;

    font-size: 14px;
`;

export const QRTitle = styled.div`
    margin-bottom: 3px;

    color: #334155;

    font-size: 13px;

    font-weight: 700;
`;

export const QRDescription = styled.div`
    color: #94a3b8;

    font-size: 10px;

    line-height: 1.4;
`;

/* =========================================================
   MEMBERSHIP CARD
========================================================= */

export const CardPreview = styled.div`
    position: relative;

    width: 430px;
    height: 271px;

    max-width: 100%;

    margin: 0 auto;

    overflow: hidden;

    box-sizing: border-box;

    background:
        linear-gradient(
            135deg,
            #0f172a 0%,
            #172554 52%,
            #1d4ed8 100%
        );

    color: #ffffff;

    box-shadow:
        0 16px 35px
        rgba(
            15,
            23,
            42,
            0.18
        );

    /*
     * Intentionally square.
     *
     * This prevents the white/transparent
     * corner issue when exporting.
     */
    border-radius: 0;

    &::before {
        content: "";

        position: absolute;

        width: 190px;
        height: 190px;

        top: -100px;
        right: -80px;

        border-radius: 50%;

        background:
            rgba(
                255,
                255,
                255,
                0.06
            );

        pointer-events: none;
    }

    &::after {
        content: "";

        position: absolute;

        width: 150px;
        height: 150px;

        left: -80px;
        bottom: -90px;

        border-radius: 50%;

        background:
            rgba(
                255,
                255,
                255,
                0.04
            );

        pointer-events: none;
    }

    @media (max-width: 500px) {
        width: 100%;

        height: auto;

        aspect-ratio:
            430 / 271;
    }
`;

/* =========================================================
   CARD TOP
========================================================= */

export const CardTop = styled.div`
    position: relative;

    z-index: 2;

    height: 58px;

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 12px;

    padding:
        16px 20px 0;

    box-sizing: border-box;
`;

export const CardBrand = styled.div`
    display: flex;

    align-items: center;

    gap: 8px;

    min-width: 0;
`;

export const CardBrandMark = styled.div`
    width: 27px;
    height: 27px;

    min-width: 27px;

    display: flex;

    align-items: center;
    justify-content: center;

    overflow: hidden;

    border-radius: 7px;

    background:
        rgba(
            255,
            255,
            255,
            0.14
        );

    color: #ffffff;

    font-size: 9px;

    font-weight: 800;

    letter-spacing: 0.04em;

    /*
     * Church logo.
     *
     * The logo stays inside the existing
     * 27px brand mark without changing
     * the card dimensions.
     */
    img {
        display: block;

        width: 100%;
        height: 100%;

        object-fit: contain;

        background: #ffffff;
    }
`;

export const CardBrandText = styled.div`
    min-width: 0;

    color: #ffffff;

    font-size: 11px;

    font-weight: 700;

    line-height: 1.2;

    white-space: nowrap;

    overflow: hidden;

    text-overflow: ellipsis;
`;

export const CardType = styled.div`
    flex-shrink: 0;

    color:
        rgba(
            255,
            255,
            255,
            0.7
        );

    font-size: 7px;

    font-weight: 700;

    letter-spacing: 0.13em;

    text-transform: uppercase;
`;

/* =========================================================
   CARD CONTENT
========================================================= */

export const CardContent = styled.div`
    position: relative;

    z-index: 2;

    height: 174px;

    display: grid;

    grid-template-columns:
        minmax(0, 1fr)
        118px;

    align-items: center;

    gap: 16px;

    padding:
        8px 20px 10px;

    box-sizing: border-box;
`;

/* =========================================================
   MEMBER DETAILS
========================================================= */

export const MemberDetails = styled.div`
    min-width: 0;

    width: 100%;
`;

export const MemberLabel = styled.div`
    margin-bottom: 4px;

    color:
        rgba(
            255,
            255,
            255,
            0.55
        );

    font-size: 7px;

    font-weight: 700;

    letter-spacing: 0.15em;

    line-height: 1;

    text-transform: uppercase;
`;

export const MemberName = styled.div`
    width: 100%;

    margin-bottom: 14px;

    color: #ffffff;

    font-size: 20px;

    font-weight: 700;

    line-height: 1.15;

    /*
     * Never clip the member name.
     */
    white-space: normal;

    overflow-wrap: anywhere;
`;

export const MemberMeta = styled.div`
    display: grid;

    grid-template-columns:
        minmax(0, 1fr)
        minmax(0, 1fr);

    gap: 12px;

    width: 100%;

    margin-bottom: 11px;
`;

export const MetaItem = styled.div`
    min-width: 0;

    display: flex;

    align-items: flex-start;

    gap: 6px;
`;

export const MetaIcon = styled.div`
    flex-shrink: 0;

    width: 12px;

    margin-top: 1px;

    color:
        rgba(
            255,
            255,
            255,
            0.65
        );

    font-size: 8px;

    line-height: 1;
`;

export const MetaLabel = styled.div`
    margin-bottom: 3px;

    color:
        rgba(
            255,
            255,
            255,
            0.48
        );

    font-size: 6px;

    font-weight: 700;

    letter-spacing: 0.08em;

    line-height: 1;

    text-transform: uppercase;
`;

export const MetaValue = styled.div`
    width: 100%;

    color: #ffffff;

    font-size: 8px;

    font-weight: 600;

    line-height: 1.3;

    /*
     * IMPORTANT:
     * No overflow hidden.
     * No ellipsis.
     * No nowrap.
     *
     * This prevents Member ID,
     * Status and Member Since
     * from being cut.
     */
    white-space: normal;

    overflow-wrap: anywhere;
`;

export const QRSection = styled.div`
    width: 118px;

    display: flex;

    flex-direction: column;

    align-items: center;

    justify-content: center;
`;

export const QRFrame = styled.div`
    width: 104px;
    height: 104px;

    padding: 6px;

    box-sizing: border-box;

    display: flex;

    align-items: center;
    justify-content: center;

    background: #ffffff;

    border-radius: 0;

    box-shadow:
        0 7px 18px
        rgba(
            0,
            0,
            0,
            0.16
        );

    canvas {
        display: block;

        width: 92px !important;
        height: 92px !important;

        max-width: none;
    }
`;

export const QRInstruction = styled.div`
    width: 100%;

    margin-top: 7px;

    color:
        rgba(
            255,
            255,
            255,
            0.65
        );

    font-size: 6px;

    font-weight: 700;

    letter-spacing: 0.08em;

    line-height: 1.2;

    text-align: center;

    text-transform: uppercase;
`;

/* =========================================================
   FOOTER
========================================================= */

export const CardFooter = styled.div`
    position: absolute;

    z-index: 2;

    left: 0;
    right: 0;
    bottom: 0;

    height: 39px;

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 12px;

    padding:
        0 20px;

    box-sizing: border-box;

    border-top:
        1px solid
        rgba(
            255,
            255,
            255,
            0.1
        );

    color:
        rgba(
            255,
            255,
            255,
            0.48
        );

    font-size: 6px;

    font-weight: 600;

    letter-spacing: 0.06em;

    line-height: 1.2;

    text-transform: uppercase;
`;

export const MemberIdentifier = styled.span`
    color:
        rgba(
            255,
            255,
            255,
            0.68
        );

    white-space: normal;

    overflow-wrap: anywhere;
`;

/* =========================================================
   DOWNLOAD
========================================================= */

export const DownloadButton = styled.button`
    width: 100%;

    max-width: 460px;

    margin: 14px auto 0;

    display: flex;

    align-items: center;

    justify-content: center;

    gap: 8px;

    padding: 10px 14px;

    border:
        1px solid
        rgba(
            15,
            23,
            42,
            0.08
        );

    border-radius: 8px;

    background: #ffffff;

    color: #334155;

    font-size: 11px;

    font-weight: 600;

    cursor: pointer;

    transition:
        background 0.2s ease,
        border-color 0.2s ease,
        color 0.2s ease,
        transform 0.2s ease;

    &:hover:not(:disabled) {
        background: #f8fafc;

        border-color:
            rgba(
                37,
                99,
                235,
                0.2
            );

        color: #2563eb;

        transform:
            translateY(-1px);
    }

    &:active:not(:disabled) {
        transform:
            translateY(0);
    }

    &:disabled {
        opacity: 0.65;

        cursor: wait;
    }

    &:focus-visible {
        outline:
            2px solid
            rgba(
                37,
                99,
                235,
                0.35
            );

        outline-offset: 2px;
    }
`;