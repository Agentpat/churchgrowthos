import {
    useState,
} from "react";

import {
    useModal,
    MODALS,
} from "../../../context/ModalContext";

import memberService from "../../../services/memberService";

import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";
import Select from "../../ui/Select/Select";

import {
    Overlay,
    ModalContainer,
    Header,
    Title,
    CloseButton,
    Form,
    Grid,
    Footer,
    ErrorMessage,
} from "./MemberModal.styles";

const MemberModal = () => {

    const {
        isOpen,
        closeModal,
    } = useModal();

    const [
        loading,
        setLoading,
    ] = useState(false);

    const [
        error,
        setError,
    ] = useState("");

    const [
        formData,
        setFormData,
    ] = useState({

        firstName: "",

        lastName: "",

        email: "",

        phone: "",

        gender: "",

    });

    if (!isOpen(MODALS.CREATE_MEMBER)) {

        return null;

    }

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value,

        });

    };

    const resetForm = () => {

        setFormData({

            firstName: "",

            lastName: "",

            email: "",

            phone: "",

            gender: "",

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            setError("");

            await memberService.createMember(
                formData
            );

            resetForm();

            closeModal();

        } catch (error) {

            setError(

                error.response?.data?.message ||

                "Unable to create member."

            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <Overlay
            onClick={closeModal}
        >

            <ModalContainer
                onClick={(e) =>
                    e.stopPropagation()
                }
            >

                <Header>

                    <Title>

                        Add New Member

                    </Title>

                    <CloseButton
                        type="button"
                        onClick={closeModal}
                    >

                        ×

                    </CloseButton>

                </Header>

                {
                    error && (

                        <ErrorMessage>

                            {error}

                        </ErrorMessage>

                    )
                }

                <Form
                    onSubmit={handleSubmit}
                >

                    <Grid>

                        <Input
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />

                        <Input
                            label="Phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />

                        <Select
                            label="Gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >

                            <option value="">

                                Select Gender

                            </option>

                            <option value="MALE">

                                Male

                            </option>

                            <option value="FEMALE">

                                Female

                            </option>

                        </Select>

                    </Grid>

                    <Footer>

                        <Button
                            type="button"
                            variant="secondary"
                            onClick={closeModal}
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
                                    : "Save Member"
                            }

                        </Button>

                    </Footer>

                </Form>

            </ModalContainer>

        </Overlay>

    );

};

export default MemberModal;