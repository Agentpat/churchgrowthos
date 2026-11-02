import {
    useState,
} from "react";


import {
    useModal,
    MODALS,
} from "../../../context/ModalContext";


import serviceService from "../../../services/serviceService";


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
} from "./ServiceModal.styles";





const ServiceModal = () => {


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

        title: "",

        serviceType: "",

        description: "",

        serviceDate: "",

        startTime: "",

        endTime: "",

        status: "SCHEDULED",

        notes: "",

    });









    if (!isOpen(MODALS.CREATE_SERVICE)) {


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

            title: "",

            serviceType: "",

            description: "",

            serviceDate: "",

            startTime: "",

            endTime: "",

            status: "SCHEDULED",

            notes: "",

        });


    };









    const handleSubmit = async (e) => {


        e.preventDefault();




        try {


            setLoading(true);

            setError("");





            await serviceService.createService(

                formData

            );





            resetForm();


            closeModal();




        } catch (error) {


            setError(

                error.response?.data?.message ||

                "Unable to create service."

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

                        Create Service

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

                            label="Service Title"

                            name="title"

                            value={formData.title}

                            onChange={handleChange}

                            placeholder="Sunday Worship Service"

                            required

                        />









                        <Select

                            label="Service Type"

                            name="serviceType"

                            value={formData.serviceType}

                            onChange={handleChange}

                            required

                        >



                            <option value="">

                                Select type

                            </option>



                            <option value="SUNDAY_SERVICE">

                                Sunday Service

                            </option>



                            <option value="MIDWEEK_SERVICE">

                                Midweek Service

                            </option>



                            <option value="PRAYER_MEETING">

                                Prayer Meeting

                            </option>



                            <option value="WORKERS_MEETING">

                                Workers Meeting

                            </option>



                            <option value="SPECIAL_PROGRAMME">

                                Special Programme

                            </option>



                            <option value="BIBLE_STUDY">

                                Bible Study

                            </option>



                            <option value="VIGIL">

                                Vigil

                            </option>



                            <option value="OTHER">

                                Other

                            </option>



                        </Select>









                        <Input

                            label="Service Date"

                            type="date"

                            name="serviceDate"

                            value={formData.serviceDate}

                            onChange={handleChange}

                            required

                        />









                        <Input

                            label="Start Time"

                            type="time"

                            name="startTime"

                            value={formData.startTime}

                            onChange={handleChange}

                            required

                        />









                        <Input

                            label="End Time"

                            type="time"

                            name="endTime"

                            value={formData.endTime}

                            onChange={handleChange}

                        />









                        <Select

                            label="Status"

                            name="status"

                            value={formData.status}

                            onChange={handleChange}

                        >



                            <option value="SCHEDULED">

                                Scheduled

                            </option>



                            <option value="LIVE">

                                Live

                            </option>



                            <option value="COMPLETED">

                                Completed

                            </option>



                            <option value="CANCELLED">

                                Cancelled

                            </option>



                        </Select>






                    </Grid>









                    <TextArea

                        name="description"

                        placeholder="Service description"

                        value={formData.description}

                        onChange={handleChange}

                    />









                    <TextArea

                        name="notes"

                        placeholder="Notes"

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

                                    ? "Creating..."

                                    : "Create Service"

                            }




                        </Button>







                    </Footer>







                </Form>







            </ModalContainer>







        </Overlay>


    );

};





export default ServiceModal;