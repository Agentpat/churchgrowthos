import {
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";

import authService from "../services/authService";
import churchService from "../services/churchService";


const AuthContext =
    createContext();


const DEFAULT_PRIMARY_COLOR =
    "#2563EB";


export const AuthProvider = ({
    children,
}) => {

    const [user, setUser] =
        useState(null);


    const [church, setChurch] =
        useState(null);


    const [churchProfile, setChurchProfile] =
        useState(null);


    const [token, setToken] =
        useState(null);


    const [loading, setLoading] =
        useState(true);


    useEffect(() => {

        const initializeAuth =
            async () => {

                const storedToken =
                    localStorage.getItem(
                        "token",
                    );


                const storedUser =
                    localStorage.getItem(
                        "user",
                    );


                const storedChurch =
                    localStorage.getItem(
                        "church",
                    );


                if (
                    storedToken &&
                    storedUser
                ) {

                    setToken(
                        storedToken,
                    );


                    setUser(
                        JSON.parse(
                            storedUser,
                        ),
                    );


                    if (
                        storedChurch
                    ) {

                        setChurch(
                            JSON.parse(
                                storedChurch,
                            ),
                        );

                    }


                    try {

                        const response =
                            await churchService.getProfile();


                        const profile =
                            response?.data ||
                            response;


                        if (profile) {

                            setChurchProfile(
                                profile,
                            );

                        }

                    } catch (
                    error
                    ) {

                        console.warn(
                            "Unable to load church profile:",
                            error,
                        );

                    }

                }


                setLoading(false);

            };


        initializeAuth();

    }, []);


    const login = async (
        credentials,
    ) => {

        const response =
            await authService.login(
                credentials,
            );


        const {
            token,
            user,
            church,
        } =
            response.data;


        localStorage.setItem(
            "token",
            token,
        );


        localStorage.setItem(
            "user",
            JSON.stringify(
                user,
            ),
        );


        localStorage.setItem(
            "church",
            JSON.stringify(
                church,
            ),
        );


        setToken(
            token,
        );


        setUser(
            user,
        );


        setChurch(
            church,
        );


        try {

            const profileResponse =
                await churchService.getProfile();


            const profile =
                profileResponse?.data ||
                profileResponse;


            setChurchProfile(
                profile,
            );

        } catch (
        error
        ) {

            console.warn(
                "Unable to load church profile after login:",
                error,
            );

            setChurchProfile(
                null,
            );

        }


        return user;

    };


    const updateChurch = (
        updatedChurch,
    ) => {

        if (!updatedChurch) {

            return;

        }


        localStorage.setItem(
            "church",
            JSON.stringify(
                updatedChurch,
            ),
        );


        setChurch(
            updatedChurch,
        );

    };


    const updateChurchProfile = (
        updatedProfile,
    ) => {

        if (!updatedProfile) {

            return;

        }


        setChurchProfile(
            updatedProfile,
        );

    };


    const logout = () => {

        localStorage.removeItem(
            "token",
        );


        localStorage.removeItem(
            "user",
        );


        localStorage.removeItem(
            "church",
        );


        setToken(null);

        setUser(null);

        setChurch(null);

        setChurchProfile(null);

    };


    return (

        <AuthContext.Provider
            value={{

                user,

                church,

                churchProfile,

                token,

                loading,

                login,

                logout,

                updateChurch,

                updateChurchProfile,

                isAuthenticated:
                    Boolean(token),

                primaryColor:
                    churchProfile?.primaryColor ||
                    DEFAULT_PRIMARY_COLOR,

            }}
        >

            {children}

        </AuthContext.Provider>

    );

};


export const useAuth = () => {

    return useContext(
        AuthContext,
    );

};