import {
    useEffect,
    useState,
} from "react";


import {
    useModal,
    MODALS,
} from "../../../context/ModalContext";


import offeringService from "../../../services/offeringService";
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
    Footer,
    ErrorMessage,
} from "./OfferingModal.styles";




const OfferingModal = () => {


    const {
        isOpen,
        closeModal,
    } = useModal();



    const [
        loading,
        setLoading,
    ] = useState(false);



    const [
        services,
        setServices,
    ] = useState([]);



    const [
        error,
        setError,
    ] = useState("");



    const [
        formData,
        setFormData,
    ] = useState({

        serviceId: "",

        amount: "",

        type: "OFFERING",

        paymentMethod: "CASH",

        transactionDate: "",

    });





    useEffect(() => {


        if (!isOpen(MODALS.RECORD_OFFERING)) {

            return;

        }



        const loadServices = async () => {


            try {


                const response =
                    await serviceService.getServices();



                console.log(
                    "SERVICE RESPONSE:",
                    response
                );



                const serviceList =
                    response?.data?.services || [];



                setServices(serviceList);



            } catch (error) {


                console.error(
                    "LOAD SERVICE ERROR:",
                    error
                );


                setError(
                    "Unable to load services."
                );


            }


        };



        loadServices();



    }, [isOpen]);







    if (!isOpen(MODALS.RECORD_OFFERING)) {

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

            amount: "",

            type: "OFFERING",

            paymentMethod: "CASH",

            transactionDate: "",

        });


    };









    const handleSubmit = async (e) => {


        e.preventDefault();



        try {


            setLoading(true);

            setError("");



            await offeringService.createOffering(
                formData
            );



            resetForm();


            closeModal();



        } catch (error) {


            setError(

                error.response?.data?.message ||

                "Unable to record offering."

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

                        Record Offering

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

                                        {service.title} - {service.serviceType.replaceAll("_", " ")}

                                    </option>


                                ))
                            }



                        </Select>







                        <Input

                            label="Amount"

                            type="number"

                            name="amount"

                            value={formData.amount}

                            onChange={handleChange}

                            required

                        />







                        <Select

                            label="Offering Type"

                            name="type"

                            value={formData.type}

                            onChange={handleChange}

                        >


                            <option value="OFFERING">

                                Offering

                            </option>


                            <option value="TITHE">

                                Tithe

                            </option>


                            <option value="DONATION">

                                Donation

                            </option>


                            <option value="SPECIAL_SEED">

                                Special Seed

                            </option>


                            <option value="OTHER">

                                Other

                            </option>


                        </Select>







                        <Select

                            label="Payment Method"

                            name="paymentMethod"

                            value={formData.paymentMethod}

                            onChange={handleChange}

                        >


                            <option value="CASH">

                                Cash

                            </option>


                            <option value="TRANSFER">

                                Transfer

                            </option>


                            <option value="CARD">

                                Card

                            </option>


                            <option value="ONLINE">

                                Online

                            </option>


                            <option value="OTHER">

                                Other

                            </option>


                        </Select>







                        <Input

                            label="Transaction Date"

                            type="date"

                            name="transactionDate"

                            value={formData.transactionDate}

                            onChange={handleChange}

                        />





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

                                    : "Save Offering"

                            }


                        </Button>





                    </Footer>





                </Form>





            </ModalContainer>





        </Overlay>


    );


};



export default OfferingModal;