import { useState } from "react";

import Modal from "../../../../components/ui/Modal/Modal";
import Button from "../../../../components/ui/Button/Button";

import {
    FormActions,
} from "../../../../components/ui/Form";

const ConvertVisitorModal = ({
    isOpen,
    onClose,
    visitor,
    onSuccess,
}) => {

    const [loading, setLoading] =
        useState(false);

    const [apiError, setApiError] =
        useState("");

    if (!visitor) {
        return null;
    }

    const handleConvert = async () => {

        try {

            setLoading(true);

            setApiError("");

            await onSuccess(visitor);

        }

        catch (error) {

            setApiError(

                error.response?.data?.message ||

                "Unable to convert visitor."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Convert Visitor"
        >

            <div>

                <p>

                    You are about to convert

                    <strong>

                        {" "}
                        {visitor.firstName} {visitor.lastName}

                    </strong>

                    {" "}into a church member.

                </p>

                <p>

                    This visitor will become an active member
                    and will now appear in the Members module.

                </p>

                {

                    apiError && (

                        <p
                            style={{
                                color: "#dc2626",
                            }}
                        >
                            {apiError}
                        </p>

                    )

                }

            </div>

            <FormActions>

                <Button
                    variant="secondary"
                    onClick={onClose}
                    disabled={loading}
                >

                    Cancel

                </Button>

                <Button
                    onClick={handleConvert}
                    disabled={loading}
                >

                    {

                        loading

                            ? "Converting..."

                            : "Convert Member"

                    }

                </Button>

            </FormActions>

        </Modal>

    );

};

export default ConvertVisitorModal;