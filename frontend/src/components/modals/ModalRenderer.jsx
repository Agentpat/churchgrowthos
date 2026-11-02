import {
    useModal,
    MODALS,
} from "../../context/ModalContext";


import MemberModal from "./MemberModal/MemberModal";

import OfferingModal from "./OfferingModal/OfferingModal";

import ServiceModal from "./ServiceModal/ServiceModal";

import AttendanceModal from "./AttendanceModal/AttendanceModal";





const ModalRenderer = () => {


    const {
        activeModal,
    } = useModal();






    if (!activeModal) {

        return null;

    }







    switch (activeModal) {



        case MODALS.CREATE_MEMBER:


            return (

                <MemberModal />

            );









        case MODALS.RECORD_OFFERING:


            return (

                <OfferingModal />

            );









        case MODALS.CREATE_SERVICE:


            return (

                <ServiceModal />

            );









        case MODALS.RECORD_ATTENDANCE:


            return (

                <AttendanceModal />

            );









        default:


            return null;


    }


};






export default ModalRenderer;