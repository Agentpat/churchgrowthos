import {
    useMemo,
} from "react";

import {
    ThemeProvider,
} from "styled-components";

import {
    useAuth,
} from "../context/AuthContext";

import {
    createTheme,
} from "./theme";


const ChurchThemeProvider = ({
    children,
}) => {

    const {
        primaryColor,
    } = useAuth();


    const theme =
        useMemo(
            () =>
                createTheme(
                    primaryColor,
                ),
            [
                primaryColor,
            ],
        );


    return (

        <ThemeProvider
            theme={theme}
        >

            {children}

        </ThemeProvider>

    );

};


export default ChurchThemeProvider;