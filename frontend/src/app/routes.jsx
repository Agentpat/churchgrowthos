import {
    Routes,
    Route,
} from "react-router-dom";

import ProtectedRoute from "../routes/ProtectedRoute";

import Login from "../pages/Auth/Login";

import DashboardLayout from "../layouts/DashboardLayout";

import Dashboard from "../pages/Dashboard/Dashboard";

import Members from "../pages/Members/Members";

import Groups from "../pages/Groups/Groups";
import GroupDetails from "../pages/Groups/GroupDetails/GroupDetails";

import Visitors from "../pages/Visitors/Visitors";

import Attendance from "../pages/Attendance/Attendance";

import Services from "../pages/Services/Services";

import Finance from "../pages/Finance/Finance";

import Staff from "../pages/Staff/Staff";

import Settings from "../features/settings/Settings";


const AppRoutes = () => {

    return (

        <Routes>

            {/* =====================================
                Public Routes
            ====================================== */}

            <Route
                path="/login"
                element={<Login />}
            />


            {/* =====================================
                Protected Routes
            ====================================== */}

            <Route
                element={<ProtectedRoute />}
            >

                <Route
                    path="/"
                    element={<DashboardLayout />}
                >

                    {/* =================================
                        Dashboard
                    ================================== */}

                    <Route
                        index
                        element={<Dashboard />}
                    />


                    {/* =================================
                        Members
                    ================================== */}

                    <Route
                        path="members"
                        element={<Members />}
                    />


                    {/* =================================
                        Groups
                    ================================== */}

                    <Route
                        path="groups"
                        element={<Groups />}
                    />

                    <Route
                        path="groups/:groupId"
                        element={<GroupDetails />}
                    />


                    {/* =================================
                        Visitors
                    ================================== */}

                    <Route
                        path="visitors"
                        element={<Visitors />}
                    />


                    {/* =================================
                        Attendance
                    ================================== */}

                    <Route
                        path="attendance"
                        element={<Attendance />}
                    />


                    {/* =================================
                        Services
                    ================================== */}

                    <Route
                        path="services"
                        element={<Services />}
                    />


                    {/* =================================
                        Finance
                    ================================== */}

                    <Route
                        path="finance"
                        element={<Finance />}
                    />


                    {/* =================================
                        Staff
                    ================================== */}

                    <Route
                        path="staff"
                        element={<Staff />}
                    />


                    {/* =================================
                        Settings
                    ================================== */}

                    <Route
                        path="settings"
                        element={<Settings />}
                    />

                </Route>

            </Route>

        </Routes>

    );

};

export default AppRoutes;