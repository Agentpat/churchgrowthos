import {
    createContext,
    useContext,
    useMemo,
    useState,
} from "react";



const ModalContext =
    createContext(null);





export const MODALS = Object.freeze({

    CREATE_MEMBER:
        "CREATE_MEMBER",


    RECORD_OFFERING:
        "RECORD_OFFERING",


    RECORD_ATTENDANCE:
        "RECORD_ATTENDANCE",


    CREATE_SERVICE:
        "CREATE_SERVICE",

});







export const ModalProvider = ({
    children,
}) => {


    const [
        activeModal,
        setActiveModal,
    ] = useState(null);




    const [
        modalData,
        setModalData,
    ] = useState(null);







    const openModal = (
        modal,
        data = null,
    ) => {



        if (
            !Object.values(MODALS)
                .includes(modal)
        ) {

            console.warn(
                `Invalid modal: ${modal}`
            );


            return;

        }





        setModalData(data);


        setActiveModal(modal);


    };










    const closeModal = () => {


        setActiveModal(null);


        setModalData(null);


    };










    const isOpen = (
        modal,
    ) => {


        return activeModal === modal;


    };









    const value = useMemo(() => ({


        activeModal,


        modalData,


        openModal,


        closeModal,


        isOpen,


    }), [

        activeModal,

        modalData,

    ]);









    return (

        <ModalContext.Provider

            value={value}

        >

            {children}

        </ModalContext.Provider>

    );

};









export const useModal = () => {


    const context =
        useContext(ModalContext);




    if (!context) {


        throw new Error(
            "useModal must be used inside ModalProvider"
        );


    }




    return context;


};