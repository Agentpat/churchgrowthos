import {
    FaExclamationTriangle,
} from "react-icons/fa";


import {
    Overlay,
    Modal,
    Icon,
    Title,
    Description,
    Actions,
    CancelButton,
    ConfirmButton,
} from "./ConfirmDeactivateModal.styles";





const ConfirmDeactivateModal = ({
    member,
    onClose,
    onConfirm,
}) => {



    return (


        <Overlay>


            <Modal>



                <Icon>

                    <FaExclamationTriangle />

                </Icon>





                <Title>

                    Deactivate Member?

                </Title>





                <Description>

                    Are you sure you want to deactivate{" "}

                    <strong>

                        {member.firstName} {member.lastName}

                    </strong>

                    ?

                    This member will no longer appear in active members.

                </Description>







                <Actions>



                    <CancelButton

                        onClick={onClose}

                    >

                        Cancel

                    </CancelButton>






                    <ConfirmButton

                        onClick={onConfirm}

                    >

                        Deactivate

                    </ConfirmButton>




                </Actions>





            </Modal>


        </Overlay>


    );


};


export default ConfirmDeactivateModal;