import {
    FaUsers,
    FaMoneyBillWave,
    FaClipboardList,
    FaCalendarCheck,
} from "react-icons/fa";


import {
    useModal,
    MODALS,
} from "../../../../context/ModalContext";


import {
    QuickActionsContainer,
    SectionTitle,
    ActionGrid,
    ActionCard,
    ActionIcon,
    ActionText,
} from "./QuickActions.styles";




const actions = [

    {
        title: "Add Member",

        icon: FaUsers,

        modal:
            MODALS.CREATE_MEMBER,

    },


    {
        title: "Record Offering",

        icon: FaMoneyBillWave,

        modal:
            MODALS.RECORD_OFFERING,

    },


    {
        title: "Create Service",

        icon: FaClipboardList,

        modal:
            MODALS.CREATE_SERVICE,

    },


    {
        title: "Record Attendance",

        icon: FaCalendarCheck,

        modal:
            MODALS.RECORD_ATTENDANCE,

    },

];





const QuickActions = () => {


    const {
        openModal,
    } = useModal();





    const handleAction = (modal) => {


        if (!modal) {

            return;

        }


        openModal(modal);


    };





    return (

        <QuickActionsContainer>


            <SectionTitle>

                Quick Actions

            </SectionTitle>





            <ActionGrid>


                {
                    actions.map((action) => {


                        const Icon =
                            action.icon;




                        return (

                            <ActionCard

                                key={action.title}

                                type="button"

                                onClick={() =>
                                    handleAction(
                                        action.modal
                                    )
                                }

                            >


                                <ActionIcon>

                                    <Icon />

                                </ActionIcon>




                                <ActionText>

                                    {action.title}

                                </ActionText>


                            </ActionCard>

                        );


                    })
                }



            </ActionGrid>



        </QuickActionsContainer>

    );

};



export default QuickActions;