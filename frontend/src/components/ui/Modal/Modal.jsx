import {
    Overlay,
    ModalContainer,
    ModalHeader,
    ModalTitle,
    CloseButton,
    ModalBody,
} from "./Modal.styles";

import {
    FaTimes,
} from "react-icons/fa";

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
}) => {

    if (!isOpen) {
        return null;
    }

    const handleOverlayClick = (event) => {

        // Only close when the actual backdrop
        // is clicked — never when clicking
        // anywhere inside the modal.

        if (
            event.target ===
            event.currentTarget
        ) {

            onClose?.();

        }

    };

    return (

        <Overlay
            onClick={handleOverlayClick}
        >

            <ModalContainer>

                <ModalHeader>

                    <ModalTitle>

                        {title}

                    </ModalTitle>

                    <CloseButton
                        type="button"
                        onClick={() =>
                            onClose?.()
                        }
                        aria-label="Close modal"
                    >

                        <FaTimes />

                    </CloseButton>

                </ModalHeader>

                <ModalBody>

                    {children}

                </ModalBody>

            </ModalContainer>

        </Overlay>

    );

};

export default Modal;