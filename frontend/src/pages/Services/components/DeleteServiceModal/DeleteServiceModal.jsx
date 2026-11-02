import {
    FaExclamationTriangle,
    FaTrash,
} from "react-icons/fa";

import Modal from "../../../../components/ui/Modal/Modal";
import Button from "../../../../components/ui/Button/Button";

import {
    Content,
    IconWrapper,
    Message,
    ServiceName,
    Footer,
    ErrorMessage,
} from "./DeleteServiceModal.styles";

const DeleteServiceModal = ({
    isOpen,
    service,
    onClose,
    onConfirm,
    loading = false,
    error = "",
}) => {

    if (!service) {
        return null;
    }

    return (

        <Modal
            isOpen={isOpen}
            onClose={() => {

                if (!loading) {
                    onClose?.();
                }

            }}
            title="Delete Service"
        >

            <Content>

                <IconWrapper>
                    <FaExclamationTriangle />
                </IconWrapper>

                <Message>

                    Are you sure you want to delete

                    {" "}

                    <ServiceName>
                        {service.title ||
                            "this service"}
                    </ServiceName>

                    ?

                    <br />

                    This action cannot be undone.

                </Message>

                {error && (

                    <ErrorMessage>
                        {error}
                    </ErrorMessage>

                )}

                <Footer>

                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                        disabled={loading}
                    >

                        Cancel

                    </Button>

                    <Button
                        type="button"
                        variant="danger"
                        onClick={onConfirm}
                        disabled={loading}
                    >

                        <FaTrash />

                        {loading
                            ? "Deleting..."
                            : "Delete Service"}

                    </Button>

                </Footer>

            </Content>

        </Modal>

    );

};

export default DeleteServiceModal;