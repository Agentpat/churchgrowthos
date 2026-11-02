import {
    useEffect,
    useState,
} from "react";

import Modal from "../../../../components/ui/Modal/Modal";
import Button from "../../../../components/ui/Button/Button";

import {
    Form,
    FormActions,
} from "../../../../components/ui/Form";

import VisitorForm from "../VisitorForm";

const EditVisitorModal = ({
    isOpen,
    onClose,
    visitor,
    onSuccess,
}) => {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
        source: "SERVICE",
        invitedBy: "",
        notes: "",
    });

    const [loading, setLoading] =
        useState(false);

    const [errors, setErrors] =
        useState({});

    const [apiError, setApiError] =
        useState("");

    useEffect(() => {

        if (!visitor) {
            return;
        }

        setFormData({

            firstName:
                visitor.firstName || "",

            lastName:
                visitor.lastName || "",

            phone:
                visitor.phone || "",

            email:
                visitor.email || "",

            address:
                visitor.address || "",

            source:
                visitor.source || "SERVICE",

            invitedBy:
                visitor.invitedBy || "",

            notes:
                visitor.notes || "",

        });

        setErrors({});

        setApiError("");

    }, [visitor]);

    const handleChange = (e) => {

        const {
            name,
            value,
        } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {

            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));

        }

        if (apiError) {

            setApiError("");

        }

    };

    const validate = () => {

        const newErrors = {};

        if (!formData.firstName.trim()) {

            newErrors.firstName =
                "First name is required.";

        }

        if (!formData.lastName.trim()) {

            newErrors.lastName =
                "Last name is required.";

        }

        if (!formData.phone.trim()) {

            newErrors.phone =
                "Phone number is required.";

        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validate()) {
            return;
        }

        try {

            setLoading(true);

            setApiError("");

            await onSuccess(
                visitor._id,
                formData,
            );

        }

        catch (error) {

            setApiError(

                error.response?.data?.message ||

                "Unable to update visitor.",

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
            title="Edit Visitor"
        >

            <Form onSubmit={handleSubmit}>

                <VisitorForm
                    formData={formData}
                    errors={errors}
                    onChange={handleChange}
                />

                {

                    apiError && (

                        <p
                            style={{
                                color: "#dc2626",
                                margin: 0,
                            }}
                        >

                            {apiError}

                        </p>

                    )

                }

                <FormActions>

                    <Button
                        variant="secondary"
                        onClick={onClose}
                        disabled={loading}
                    >

                        Cancel

                    </Button>

                    <Button
                        type="submit"
                        disabled={loading}
                    >

                        {

                            loading

                                ? "Saving..."

                                : "Save Changes"

                        }

                    </Button>

                </FormActions>

            </Form>

        </Modal>

    );

};

export default EditVisitorModal;