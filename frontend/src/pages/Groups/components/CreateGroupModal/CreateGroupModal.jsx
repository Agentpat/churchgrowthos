import { useState } from "react";

import groupService from "../../../../services/groupService";

import {
    Overlay,
    Modal,
    Title,
    Form,
    Input,
    TextArea,
    Select,
    Actions,
    Button,
} from "./CreateGroupModal.styles";


const CreateGroupModal = ({
    onClose,
    onSuccess,
}) => {


    const [formData, setFormData] = useState({

        name: "",

        description: "",

        type: "MINISTRY",

    });



    const [loading, setLoading] = useState(false);



    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };




    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            setLoading(true);



            await groupService.createGroup(
                formData
            );



            // Refresh groups list

            if (onSuccess) {

                onSuccess();

            }



        } catch (error) {

            console.error(
                "Failed creating group",
                error
            );


        } finally {

            setLoading(false);

        }

    };





    return (

        <Overlay>


            <Modal>


                <Title>
                    Create Group
                </Title>



                <Form onSubmit={handleSubmit}>


                    <Input

                        name="name"

                        placeholder="Group name"

                        value={formData.name}

                        onChange={handleChange}

                        required

                    />



                    <TextArea

                        name="description"

                        placeholder="Description"

                        value={formData.description}

                        onChange={handleChange}

                    />



                    <Select

                        name="type"

                        value={formData.type}

                        onChange={handleChange}

                    >


                        <option value="MINISTRY">
                            Ministry
                        </option>


                        <option value="DEPARTMENT">
                            Department
                        </option>


                        <option value="FELLOWSHIP">
                            Fellowship
                        </option>


                        <option value="UNIT">
                            Unit
                        </option>


                    </Select>




                    <Actions>



                        <Button

                            type="button"

                            onClick={onClose}

                        >

                            Cancel

                        </Button>





                        <Button

                            type="submit"

                            disabled={loading}

                        >

                            {
                                loading
                                    ? "Creating..."
                                    : "Create"
                            }


                        </Button>



                    </Actions>



                </Form>


            </Modal>


        </Overlay>

    );

};


export default CreateGroupModal;