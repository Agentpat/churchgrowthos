import {
    useEffect,
} from "react";

import StaffForm from "../StaffForm/StaffForm";

import {
    Overlay,
    Modal,
    ModalHeader,
    ModalTitleWrapper,
    ModalTitle,
    ModalDescription,
    CloseButton,
    ModalBody,
} from "./StaffModal.styles";


// =====================================
// Staff Modal
// =====================================

const StaffModal = ({
    open = false,

    mode = "create",

    staff = null,

    onClose,
    onSubmit,

    loading = false,
    error = "",
}) => {

    // =====================================
    // Lock Body Scroll
    // =====================================

    useEffect(() => {

        if (!open) {
            return;
        }


        const originalOverflow =
            document.body.style.overflow;


        document.body.style.overflow =
            "hidden";


        return () => {

            document.body.style.overflow =
                originalOverflow;

        };

    }, [open]);


    // =====================================
    // Escape Key
    // =====================================

    useEffect(() => {

        if (!open) {
            return;
        }


        const handleKeyDown = (
            event,
        ) => {

            if (
                event.key === "Escape" &&
                !loading
            ) {
                onClose?.();
            }

        };


        document.addEventListener(
            "keydown",
            handleKeyDown,
        );


        return () => {

            document.removeEventListener(
                "keydown",
                handleKeyDown,
            );

        };

    }, [
        open,
        loading,
        onClose,
    ]);


    // =====================================
    // Don't Render
    // =====================================

    if (!open) {
        return null;
    }


    const isEdit =
        mode === "edit";


    // =====================================
    // Render
    // =====================================

    return (

        <Overlay
            role="presentation"
            onMouseDown={(event) => {

                if (
                    event.target ===
                    event.currentTarget &&
                    !loading
                ) {
                    onClose?.();
                }

            }}
        >

            <Modal
                role="dialog"
                aria-modal="true"
                aria-labelledby="staff-modal-title"
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
            >

                {/* =================================
            Header
        ================================= */}

                <ModalHeader>

                    <ModalTitleWrapper>

                        <ModalTitle
                            id="staff-modal-title"
                        >
                            {isEdit
                                ? "Edit Staff"
                                : "Add Staff"}
                        </ModalTitle>


                        <ModalDescription>

                            {isEdit
                                ? "Update this staff member's information."
                                : "Add a staff member to your church team."}

                        </ModalDescription>

                    </ModalTitleWrapper>


                    <CloseButton
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        aria-label="Close staff form"
                    >
                        ×
                    </CloseButton>

                </ModalHeader>


                {/* =================================
            Body
        ================================= */}

                <ModalBody>

                    <StaffForm
                        initialData={
                            isEdit
                                ? staff
                                : null
                        }

                        onSubmit={
                            onSubmit
                        }

                        onCancel={
                            onClose
                        }

                        loading={
                            loading
                        }

                        error={
                            error
                        }
                    />

                </ModalBody>

            </Modal>

        </Overlay>

    );

};


export default StaffModal;