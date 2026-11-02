import {
    useState,
} from "react";


import {
    Outlet,
} from "react-router-dom";



import Sidebar from "../components/layout/Sidebar/Sidebar";

import MobileSidebar from "../components/layout/MobileSidebar/MobileSidebar";

import Header from "../components/layout/Header/Header";


// Global Modal Controller
import ModalRenderer from "../components/modals/ModalRenderer";



import {
    LayoutContainer,
    MainContent,
    PageContainer,
} from "./DashboardLayout.styles";







const DashboardLayout = () => {


    const [
        sidebarOpen,
        setSidebarOpen,
    ] = useState(false);






    const openSidebar = () => {

        setSidebarOpen(true);

    };





    const closeSidebar = () => {

        setSidebarOpen(false);

    };






    return (


        <LayoutContainer>



            {/* Desktop Sidebar */}

            <Sidebar />






            {/* Mobile Sidebar Drawer */}

            <MobileSidebar

                open={sidebarOpen}

                close={closeSidebar}

            />







            <MainContent>




                <Header

                    onMenuClick={openSidebar}

                />







                <PageContainer>


                    <Outlet />


                </PageContainer>





            </MainContent>







            {/* Global Dashboard Modals */}

            <ModalRenderer />





        </LayoutContainer>


    );

};




export default DashboardLayout;