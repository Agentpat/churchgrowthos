import {
    FaTimes,
} from "react-icons/fa";


import Sidebar from "../Sidebar/Sidebar";


import {
    Overlay,
    Drawer,
    CloseButton,
} from "./MobileSidebar.styles";



const MobileSidebar = ({
    open,
    close,
}) => {


    return (

        <>


            <Overlay
                open={open}
                onClick={close}
            />



            <Drawer
                open={open}
            >


                <CloseButton

                    onClick={close}

                >

                    <FaTimes />

                </CloseButton>





                <Sidebar

                    mobile

                    close={close}

                />



            </Drawer>


        </>

    );

};


export default MobileSidebar;