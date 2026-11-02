import {
    useEffect,
    useState,
} from "react";


import {
    useModal,
    MODALS,
} from "../../../context/ModalContext";


import attendanceService from "../../../services/attendanceService";
import serviceService from "../../../services/serviceService";
import membersService from "../../../services/memberService";


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
    TextArea,
    Footer,
    ErrorMessage,
} from "./AttendanceModal.styles";






const AttendanceModal = () => {


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
        services,
        setServices,
    ] = useState([]);






    const [
        members,
        setMembers,
    ] = useState([]);








    const [
        formData,
        setFormData,
    ] = useState({

        serviceId: "",

        memberId: "",

        status: "PRESENT",

        checkInMethod: "MANUAL",

        notes: "",

    });










    useEffect(() => {


        if (!isOpen(MODALS.RECORD_ATTENDANCE)) {

            return;

        }






        const loadData = async () => {


            try {


                const [
                    servicesResponse,
                    membersResponse,
                ] = await Promise.all([


                    serviceService.getServices(),


                    membersService.getMembers(),


                ]);





                setServices(

                    servicesResponse?.data?.services || []

                );





                setMembers(

                    membersResponse?.data?.members || []

                );





            } catch (error) {


                console.error(
                    "ATTENDANCE LOAD ERROR:",
                    error
                );



                setError(

                    "Unable to load services or members."

                );


            }


        };





        loadData();




    }, [isOpen]);









    if (!isOpen(MODALS.RECORD_ATTENDANCE)) {

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

            serviceId: "",

            memberId: "",

            status: "PRESENT",

            checkInMethod: "MANUAL",

            notes: "",

        });


    };









    const handleSubmit = async (e) => {


        e.preventDefault();



        try {


            setLoading(true);

            setError("");






            await attendanceService.recordAttendance(

                formData

            );






            resetForm();


            closeModal();





        } catch (error) {



            console.error(
                "ATTENDANCE ERROR:",
                error
            );



            setError(


                error.response?.data?.message ||


                "Unable to record attendance."


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

                        Record Attendance

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







                        <Select


                            label="Service"


                            name="serviceId"


                            value={formData.serviceId}


                            onChange={handleChange}


                            required


                        >





                            <option value="">


                                Select Service


                            </option>









                            {

                                services.map((service) => (



                                    <option


                                        key={service._id}


                                        value={service._id}


                                    >


                                        {
                                            service.title
                                        }
                                        
                                        {" ("}

                                        {
                                            service.serviceType.replaceAll(
                                                "_",
                                                " "
                                            )
                                        }

                                        {")"}


                                    </option>



                                ))

                            }





                        </Select>














                        <Select


                            label="Member"


                            name="memberId"


                            value={formData.memberId}


                            onChange={handleChange}


                            required


                        >





                            <option value="">


                                Select Member


                            </option>









                            {

                                members.map((member) => (



                                    <option


                                        key={member._id}


                                        value={member._id}


                                    >


                                        {
                                            member.firstName
                                        }

                                        {" "}

                                        {
                                            member.lastName
                                        }



                                    </option>



                                ))

                            }





                        </Select>













                        <Select


                            label="Attendance Status"


                            name="status"


                            value={formData.status}


                            onChange={handleChange}


                        >





                            <option value="PRESENT">

                                Present

                            </option>





                            <option value="ABSENT">

                                Absent

                            </option>






                            <option value="EXCUSED">

                                Excused

                            </option>





                        </Select>












                        <Select


                            label="Check-in Method"


                            name="checkInMethod"


                            value={formData.checkInMethod}


                            onChange={handleChange}


                        >





                            <option value="MANUAL">

                                Manual

                            </option>






                            <option value="QR_CODE">

                                QR Code

                            </option>






                            <option value="SELF_CHECK_IN">

                                Self Check-in

                            </option>






                            <option value="SMS">

                                SMS

                            </option>





                        </Select>







                    </Grid>









                    <TextArea


                        name="notes"


                        placeholder="Notes (optional)"


                        value={formData.notes}


                        onChange={handleChange}



                    />









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

                                    ? "Recording..."

                                    : "Record Attendance"


                            }






                        </Button>







                    </Footer>








                </Form>







            </ModalContainer>







        </Overlay>



    );


};






export default AttendanceModal;