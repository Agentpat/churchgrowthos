import {
    StrictMode,
} from "react";

import {
    createRoot,
} from "react-dom/client";

import App from "./App.jsx";

import GlobalStyles from "./styles/GlobalStyles.js";

import {
    AuthProvider,
} from "./context/AuthContext.jsx";

import {
    ModalProvider,
} from "./context/ModalContext.jsx";

import ChurchThemeProvider from "./styles/ThemeProvider.jsx";


createRoot(
    document.getElementById(
        "root",
    ),
).render(

    <StrictMode>

        <AuthProvider>

            <ChurchThemeProvider>

                <GlobalStyles />

                <ModalProvider>

                    <App />

                </ModalProvider>

            </ChurchThemeProvider>

        </AuthProvider>

    </StrictMode>

);