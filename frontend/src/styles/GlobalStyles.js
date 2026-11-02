import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

    /*
    ===============================
    CSS RESET
    ===============================
    */

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }


    html {
        scroll-behavior: smooth;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }


    body {

        margin: 0;

        min-height: 100vh;

        font-family:
            ${({ theme }) => theme.typography.fontFamily};

        font-size:
            ${({ theme }) => theme.typography.sizes.md};

        line-height:
            ${({ theme }) => theme.typography.lineHeight.normal};

        font-weight:
            ${({ theme }) => theme.typography.weights.regular};

        color:
            ${({ theme }) => theme.colors.text.primary};


        background:
            ${({ theme }) => theme.colors.background.main};


        overflow-x: hidden;

    }



    /*
    ===============================
    TYPOGRAPHY RESET
    ===============================
    */


    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {

        margin: 0;

        font-weight:
            ${({ theme }) => theme.typography.weights.semibold};

        color:
            ${({ theme }) => theme.colors.text.primary};

    }


    p {

        margin: 0;

        color:
            ${({ theme }) => theme.colors.text.secondary};

    }



    /*
    ===============================
    LINKS
    ===============================
    */


    a {

        color: inherit;

        text-decoration: none;

    }



    /*
    ===============================
    BUTTON RESET
    ===============================
    */


    button {

        border: none;

        outline: none;

        cursor: pointer;

        background: transparent;

        font-family: inherit;

    }



    /*
    ===============================
    INPUT RESET
    ===============================
    */


    input,
    textarea,
    select {

        font-family: inherit;

        font-size: inherit;

        outline: none;

    }



    /*
    ===============================
    IMAGES
    ===============================
    */


    img {

        max-width: 100%;

        display: block;

        object-fit: cover;

    }



    /*
    ===============================
    SCROLLBAR
    PREMIUM SAAS STYLE
    ===============================
    */


    ::-webkit-scrollbar {

        width: 8px;

        height: 8px;

    }


    ::-webkit-scrollbar-track {

        background:
            ${({ theme }) => theme.colors.background.secondary};

    }


    ::-webkit-scrollbar-thumb {

        background:
            #CBD5E1;

        border-radius:
            999px;

    }


    ::-webkit-scrollbar-thumb:hover {

        background:
            #94A3B8;

    }



    /*
    ===============================
    SELECTION
    ===============================
    */


    ::selection {

        background:
            ${({ theme }) => theme.colors.primary.main};

        color:
            ${({ theme }) => theme.colors.primary.contrast};

    }



    /*
    ===============================
    GLASSMORPHISM SUPPORT
    ===============================
    */


    .glass {

        background:
            ${({ theme }) => theme.glass.background};


        backdrop-filter:
            ${({ theme }) => theme.glass.blur};


        -webkit-backdrop-filter:
            ${({ theme }) => theme.glass.blur};


        border:
            ${({ theme }) => theme.glass.border};

    }



    /*
    ===============================
    MOBILE OPTIMIZATION
    ===============================
    */


    @media(max-width: ${({ theme }) => theme.breakpoints.tablet}) {


        body {

            font-size:
                ${({ theme }) => theme.typography.sizes.sm};

        }


    }


`;

export default GlobalStyles;
