const DEFAULT_PRIMARY_COLOR =
    "#2563EB";


const hexToRgb = (
    hex,
) => {

    const normalized =
        hex.replace(
            "#",
            "",
        );

    const bigint =
        parseInt(
            normalized,
            16,
        );

    return {
        r:
            (bigint >> 16) &
            255,

        g:
            (bigint >> 8) &
            255,

        b:
            bigint &
            255,
    };

};


const rgbToHex = (
    r,
    g,
    b,
) => {

    return (
        "#" +
        [r, g, b]
            .map(
                (value) =>
                    value
                        .toString(16)
                        .padStart(
                            2,
                            "0",
                        ),
            )
            .join("")
            .toUpperCase()
    );

};


const adjustColor = (
    hex,
    amount,
) => {

    try {

        const {
            r,
            g,
            b,
        } = hexToRgb(hex);

        return rgbToHex(
            Math.max(
                0,
                Math.min(
                    255,
                    r + amount,
                ),
            ),

            Math.max(
                0,
                Math.min(
                    255,
                    g + amount,
                ),
            ),

            Math.max(
                0,
                Math.min(
                    255,
                    b + amount,
                ),
            ),
        );

    } catch {

        return DEFAULT_PRIMARY_COLOR;

    }

};


const getPrimaryColor =
    (color) => {

        if (
            typeof color !==
                "string" ||
            !/^#[0-9A-Fa-f]{6}$/.test(
                color,
            )
        ) {

            return DEFAULT_PRIMARY_COLOR;

        }

        return color.toUpperCase();

    };


const createTheme = (
    primaryColor,
) => {

    const primary =
        getPrimaryColor(
            primaryColor,
        );


    return {

        /**
         * Brand Colors
         */

        colors: {

            primary: {

                main:
                    primary,

                dark:
                    adjustColor(
                        primary,
                        -35,
                    ),

                light:
                    adjustColor(
                        primary,
                        55,
                    ),

                contrast:
                    "#FFFFFF",

            },


            secondary: {

                main:
                    "#0F172A",

                light:
                    "#334155",

            },


            background: {

                main:
                    "#F8FAFC",

                secondary:
                    "#F1F5F9",

                dark:
                    "#020617",

            },


            surface: {

                default:
                    "#FFFFFF",

                elevated:
                    "#FFFFFF",

            },


            text: {

                primary:
                    "#0F172A",

                secondary:
                    "#475569",

                muted:
                    "#94A3B8",

                inverse:
                    "#FFFFFF",

            },


            border: {

                default:
                    "#E2E8F0",

                light:
                    "#F1F5F9",

            },


            status: {

                success:
                    "#16A34A",

                warning:
                    "#F59E0B",

                danger:
                    "#DC2626",

                info:
                    "#0284C7",

            },


            finance: {

                income:
                    "#16A34A",

                expense:
                    "#DC2626",

                balance:
                    primary,

            },

        },


        /**
         * Glassmorphism System
         */

        glass: {

            background:
                "rgba(255,255,255,0.65)",

            backgroundDark:
                "rgba(15,23,42,0.65)",

            border:
                "1px solid rgba(255,255,255,0.35)",

            blur:
                "blur(20px)",

            shadow:
                "0 20px 40px rgba(15,23,42,0.08)",

        },


        /**
         * Typography
         */

        typography: {

            fontFamily:
                "'Inter', 'Segoe UI', Arial, sans-serif",

            weights: {

                regular: 400,

                medium: 500,

                semibold: 600,

                bold: 700,

                extraBold: 800,

            },

            sizes: {

                xs: "12px",

                sm: "14px",

                md: "16px",

                lg: "18px",

                xl: "20px",

                "2xl": "24px",

                "3xl": "30px",

                "4xl": "36px",

            },

            lineHeight: {

                tight:
                    "1.25",

                normal:
                    "1.5",

                relaxed:
                    "1.75",

            },

        },


        /**
         * Spacing System
         */

        spacing: {

            xs:
                "4px",

            sm:
                "8px",

            md:
                "16px",

            lg:
                "24px",

            xl:
                "32px",

            "2xl":
                "40px",

            "3xl":
                "48px",

            "4xl":
                "64px",

        },


        /**
         * Border Radius
         */

        radius: {

            sm:
                "8px",

            md:
                "12px",

            lg:
                "16px",

            xl:
                "24px",

            pill:
                "999px",

            circle:
                "50%",

        },


        /**
         * Shadows
         */

        shadows: {

            xs:
                "0 1px 2px rgba(15,23,42,0.05)",

            sm:
                "0 4px 10px rgba(15,23,42,0.06)",

            md:
                "0 10px 25px rgba(15,23,42,0.08)",

            lg:
                "0 20px 40px rgba(15,23,42,0.12)",

            xl:
                "0 30px 60px rgba(15,23,42,0.16)",

        },


        /**
         * Layout
         */

        layout: {

            sidebarWidth:
                "260px",

            mobileHeaderHeight:
                "64px",

            desktopHeaderHeight:
                "72px",

            maxContentWidth:
                "1440px",

        },


        /**
         * Breakpoints
         */

        breakpoints: {

            mobile:
                "480px",

            tablet:
                "768px",

            laptop:
                "1024px",

            desktop:
                "1280px",

            wide:
                "1440px",

        },


        /**
         * Animation
         */

        animation: {

            fast:
                "150ms ease",

            normal:
                "250ms ease",

            slow:
                "400ms ease",

            spring:
                "cubic-bezier(0.16,1,0.3,1)",

        },


        /**
         * Z Index
         */

        zIndex: {

            base: 1,

            dropdown: 100,

            sticky: 200,

            header: 300,

            modal: 400,

            toast: 500,

        },


        /**
         * Form Components
         */

        input: {

            height:
                "44px",

            borderRadius:
                "12px",

            padding:
                "0 16px",

            focusRing:
                `0 0 0 4px rgba(
                    ${hexToRgb(primary).r},
                    ${hexToRgb(primary).g},
                    ${hexToRgb(primary).b},
                    0.15
                )`,

        },


        /**
         * Cards
         */

        card: {

            padding:
                "24px",

            radius:
                "16px",

            background:
                "rgba(255,255,255,0.7)",

            border:
                "1px solid rgba(255,255,255,0.4)",

            backdropFilter:
                "blur(20px)",

        },


        /**
         * Mobile Rules
         */

        mobile: {

            pagePadding:
                "16px",

            cardPadding:
                "16px",

        },

    };

};


export {
    DEFAULT_PRIMARY_COLOR,
    createTheme,
};


const theme =
    createTheme(
        DEFAULT_PRIMARY_COLOR,
    );


export default theme;