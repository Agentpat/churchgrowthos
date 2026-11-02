import { useEffect, useState } from "react";

import membersService from "../../../../services/memberService";
import groupService from "../../../../services/groupService";


import {
    Overlay,
    Modal,
    Title,
    Form,
    Select,
    Actions,
    Button,
    Loader,
} from "./AddMemberModal.styles";



const AddMemberModal = ({
    groupId,
    onClose,
    onAdded,
}) => {


    const [members, setMembers] = useState([]);


    const [memberId, setMemberId] = useState("");


    const [role, setRole] = useState(
        "MEMBER"
    );


    const [loading, setLoading] = useState(false);


    const [saving, setSaving] = useState(false);




    useEffect(() => {

        loadMembers();

    }, []);






    const loadMembers = async () => {

        try {

            setLoading(true);


            const response =
                await membersService.getMembers();



            setMembers(
                response.members ||
                response.data?.members ||
                []
            );


        } catch (error) {

            console.error(
                "Failed loading members",
                error
            );


        } finally {

            setLoading(false);

        }

    };






    const handleSubmit = async (e) => {

        e.preventDefault();



        if (!memberId) {

            return;

        }




        try {

            setSaving(true);



            await groupService.addMemberToGroup(

                groupId,

                {
                    memberId,

                    role,
                }

            );




            if (onAdded) {

                onAdded();

            }




            onClose();



        } catch (error) {

            console.error(
                "Failed adding member",
                error
            );


        } finally {

            setSaving(false);

        }

    };







    return (

        <Overlay>


            <Modal>


                <Title>
                    Add Member To Group
                </Title>




                {
                    loading ? (

                        <Loader>

                            Loading members...

                        </Loader>


                    ) : (


                        <Form
                            onSubmit={handleSubmit}
                        >



                            <Select

                                value={memberId}

                                onChange={(e) =>
                                    setMemberId(
                                        e.target.value
                                    )
                                }

                            >

                                <option value="">
                                    Select Member
                                </option>


                                {
                                    members.map(
                                        (member) => (


                                            <option

                                                key={
                                                    member._id
                                                }

                                                value={
                                                    member._id
                                                }

                                            >

                                                {
                                                    member.firstName
                                                }
                                                {" "}
                                                {
                                                    member.lastName
                                                }


                                            </option>


                                        )
                                    )
                                }


                            </Select>







                            <Select

                                value={role}

                                onChange={(e) =>
                                    setRole(
                                        e.target.value
                                    )
                                }


                            >

                                <option value="MEMBER">
                                    Member
                                </option>


                                <option value="LEADER">
                                    Leader
                                </option>


                                <option value="ASSISTANT">
                                    Assistant
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

                                    disabled={saving}

                                >

                                    {
                                        saving
                                            ? "Adding..."
                                            : "Add Member"
                                    }


                                </Button>




                            </Actions>




                        </Form>


                    )
                }



            </Modal>


        </Overlay>

    );

};


export default AddMemberModal;