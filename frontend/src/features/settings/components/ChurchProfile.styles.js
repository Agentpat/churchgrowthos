import styled from "styled-components";


export const ProfileHeader = styled.div`
    display: flex;

    align-items: center;

    justify-content: space-between;

    margin-bottom: 28px;

    padding-bottom: 20px;

    border-bottom:
        1px solid
        rgba(
            15,
            23,
            42,
            0.07
        );
`;


export const ProfileTitleGroup = styled.div`
    display: flex;

    align-items: center;

    gap: 12px;

    min-width: 0;
`;


export const ProfileIcon = styled.div`
    width: 38px;

    height: 38px;

    min-width: 38px;

    display: flex;

    align-items: center;

    justify-content: center;

    border-radius: 10px;

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


export const ProfileTitle = styled.h2`
    margin: 0 0 4px;

    color: #334155;

    font-size: 15px;

    font-weight: 700;

    line-height: 1.3;
`;


export const ProfileDescription = styled.p`
    margin: 0;

    color: #94a3b8;

    font-size: 10px;

    line-height: 1.5;
`;


export const ErrorMessage = styled.div`
    margin-bottom: 20px;

    padding: 11px 13px;

    border:
        1px solid
        #fecaca;

    border-radius: 9px;

    background: #fef2f2;

    color: #b91c1c;

    font-size: 11px;

    line-height: 1.5;
`;


export const FormGrid = styled.div`
    display: grid;

    grid-template-columns:
        repeat(
            2,
            minmax(0, 1fr)
        );

    gap:
        18px 16px;

    @media (max-width: 650px) {
        grid-template-columns: 1fr;
    }
`;


export const FullWidthField = styled.div`
    grid-column: 1 / -1;
`;


/* =====================================
   LOGO SECTION
===================================== */

export const LogoSection = styled.div`
    display: flex;

    align-items: center;

    gap: 18px;

    margin-bottom: 28px;

    padding: 16px;

    border:
        1px solid
        rgba(
            15,
            23,
            42,
            0.07
        );

    border-radius: 12px;

    background: #fafbfc;

    @media (max-width: 560px) {
        align-items: flex-start;

        flex-direction: column;
    }
`;


export const LogoPreview = styled.div`
    width: 72px;

    height: 72px;

    min-width: 72px;

    display: flex;

    align-items: center;

    justify-content: center;

    overflow: hidden;

    border:
        1px solid
        rgba(
            15,
            23,
            42,
            0.08
        );

    border-radius: 12px;

    background: #ffffff;

    img {
        display: block;

        width: 100%;

        height: 100%;

        object-fit: contain;
    }
`;


export const LogoPlaceholder = styled.div`
    display: flex;

    align-items: center;

    justify-content: center;

    color: #94a3b8;

    font-size: 20px;
`;


export const LogoInfo = styled.div`
    flex: 1;

    min-width: 0;
`;


export const LogoTitle = styled.div`
    margin-bottom: 4px;

    color: #334155;

    font-size: 11px;

    font-weight: 700;
`;


export const LogoDescription = styled.p`
    max-width: 600px;

    margin: 0 0 10px;

    color: #94a3b8;

    font-size: 9px;

    line-height: 1.5;
`;


/* =====================================
   LOGO UPLOAD
===================================== */

export const LogoInput = styled.div`
    width: 100%;

    max-width: 520px;

    display: flex;

    flex-direction: column;

    align-items: flex-start;

    gap: 6px;
`;


export const FileInput = styled.input`
    display: none;
`;


export const FileInputLabel = styled.label`
    width: fit-content;

    min-height: 34px;

    display: inline-flex;

    align-items: center;

    justify-content: center;

    gap: 8px;

    padding: 0 12px;

    box-sizing: border-box;

    border:
        1px solid
        rgba(
            37,
            99,
            235,
            0.16
        );

    border-radius: 8px;

    background:
        rgba(
            37,
            99,
            235,
            0.06
        );

    color: #2563eb;

    font-size: 10px;

    font-weight: 600;

    line-height: 1;

    cursor: pointer;

    transition:
        background 0.2s ease,
        border-color 0.2s ease,
        color 0.2s ease;

    &:hover {
        background:
            rgba(
                37,
                99,
                235,
                0.1
            );

        border-color:
            rgba(
                37,
                99,
                235,
                0.25
            );
    }

    svg {
        flex-shrink: 0;

        font-size: 10px;
    }
`;


export const FileInputText = styled.span`
    max-width: 300px;

    overflow: hidden;

    text-overflow: ellipsis;

    white-space: nowrap;

    @media (max-width: 500px) {
        max-width: 200px;
    }
`;


export const FileInputHint = styled.span`
    color: #94a3b8;

    font-size: 9px;

    line-height: 1.4;
`;


export const RemoveLogoButton = styled.button`
    display: inline-flex;

    align-items: center;

    gap: 5px;

    margin-top: 2px;

    padding: 0;

    border: 0;

    background: transparent;

    color: #dc2626;

    font-family: inherit;

    font-size: 9px;

    font-weight: 600;

    cursor: pointer;

    transition:
        color 0.2s ease;

    &:hover {
        color: #b91c1c;
    }

    svg {
        font-size: 9px;
    }
`;


/* =====================================
   PRIMARY BRAND COLOR
===================================== */

export const ColorField = styled.div`
    width: 100%;

    min-width: 0;

    display: flex;

    flex-direction: column;

    align-items: flex-start;
`;


export const ColorFieldLabel = styled.label`
    display: block;

    margin-bottom: 7px;

    color: #475569;

    font-size: 10px;

    font-weight: 600;

    line-height: 1.4;
`;


export const ColorPickerRow = styled.div`
    width: 100%;

    min-height: 40px;

    display: flex;

    align-items: center;

    gap: 9px;

    box-sizing: border-box;
`;


export const ColorPicker = styled.input`
    width: 40px;

    height: 40px;

    flex-shrink: 0;

    padding: 3px;

    border:
        1px solid
        rgba(
            15,
            23,
            42,
            0.12
        );

    border-radius: 9px;

    background: #ffffff;

    cursor: pointer;

    appearance: none;

    -webkit-appearance: none;

    overflow: hidden;

    transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease;

    &:hover {
        border-color:
            rgba(
                37,
                99,
                235,
                0.3
            );
    }

    &:focus-visible {
        outline: none;

        border-color:
            #2563eb;

        box-shadow:
            0 0 0 3px
            rgba(
                37,
                99,
                235,
                0.12
            );
    }

    &::-webkit-color-swatch-wrapper {
        padding: 0;
    }

    &::-webkit-color-swatch {
        border: none;

        border-radius: 6px;
    }

    &::-moz-color-swatch {
        border: none;

        border-radius: 6px;
    }
`;


export const ColorValue = styled.div`
    min-width: 82px;

    height: 40px;

    display: flex;

    align-items: center;

    padding: 0 11px;

    box-sizing: border-box;

    border:
        1px solid
        rgba(
            15,
            23,
            42,
            0.08
        );

    border-radius: 9px;

    background: #fafbfc;

    color: #475569;

    font-family:
        "SFMono-Regular",
        Consolas,
        "Liberation Mono",
        monospace;

    font-size: 10px;

    font-weight: 600;

    letter-spacing: 0.01em;
`;


export const ColorPreview = styled.div`
    width: 40px;

    height: 40px;

    flex-shrink: 0;

    border-radius: 9px;

    background:
        ${({ $color }) =>
            $color || "#1E40AF"};

    border:
        1px solid
        rgba(
            15,
            23,
            42,
            0.1
        );

    box-sizing: border-box;

    transition:
        background 0.2s ease;
`;


export const ColorDescription = styled.span`
    display: block;

    margin-top: 7px;

    color: #94a3b8;

    font-size: 9px;

    line-height: 1.5;
`;


/* =====================================
   FORM ACTIONS
===================================== */

export const FormActions = styled.div`
    display: flex;

    align-items: center;

    justify-content: flex-end;

    gap: 14px;

    margin-top: 28px;

    padding-top: 20px;

    border-top:
        1px solid
        rgba(
            15,
            23,
            42,
            0.07
        );

    button {
        display: inline-flex;

        align-items: center;

        justify-content: center;

        gap: 7px;
    }

    @media (max-width: 500px) {
        align-items: stretch;

        flex-direction: column-reverse;

        button {
            width: 100%;
        }
    }
`;


export const SaveStatus = styled.div`
    display: flex;

    align-items: center;

    gap: 6px;

    color: #16a34a;

    font-size: 10px;

    font-weight: 600;

    svg {
        font-size: 11px;
    }
`;


export const LoadingState = styled.div`
    min-height: 220px;

    display: flex;

    align-items: center;

    justify-content: center;

    color: #94a3b8;

    font-size: 12px;
`;