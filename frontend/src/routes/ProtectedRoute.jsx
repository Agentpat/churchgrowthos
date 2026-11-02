import {
    Navigate,
    Outlet,
} from "react-router-dom";


import {
    useAuth,
} from "../context/AuthContext";


import Loader from "../components/ui/Loader/Loader";



const ProtectedRoute = () => {


    const {
        isAuthenticated,
        loading,
    } = useAuth();




    if (loading) {

        return (

            <Loader

                text="Loading..."

            />

        );

    }





    if (!isAuthenticated) {


        return (

            <Navigate

                to="/login"

                replace

            />

        );

    }





    return (

        <Outlet />

    );

};



export default ProtectedRoute;