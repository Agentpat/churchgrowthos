import {
  useState,
} from "react";


import {
  FaTimes,
  FaUserPlus,
} from "react-icons/fa";


import {
  Overlay,
  Modal,
  Header,
  Title,
  CloseButton,
  Form,
  InputGroup,
  Label,
  Input,
  Select,
  Actions,
  CancelButton,
  SubmitButton,
  ErrorMessage,
} from "./AddMemberModal.styles";





const AddMemberModal = ({
  onClose,
  onSuccess,
}) => {



  const [
    formData,
    setFormData,
  ] = useState({

    firstName: "",

    lastName: "",

    phone: "",

    email: "",

    gender: "",

  });





  const [
    error,
    setError,
  ] = useState("");







  const handleChange = (e) => {


    const {
      name,
      value,
    } = e.target;



    setFormData({

      ...formData,

      [name]: value,

    });


  };









  const handleSubmit = async (e) => {


    e.preventDefault();



    try {


      setError("");



      await onSuccess(
        formData
      );



      onClose();



    } catch (error) {


      setError(

        error.response?.data?.message ||

        "Unable to create member."

      );


    }


  };









  return (


    <Overlay>


      <Modal>




        <Header>



          <Title>


            <FaUserPlus />


            Add Member



          </Title>







          <CloseButton

            onClick={onClose}

          >


            <FaTimes />


          </CloseButton>



        </Header>









        <Form

          onSubmit={handleSubmit}

        >





          <InputGroup>


            <Label>

              First Name

            </Label>



            <Input


              name="firstName"


              value={
                formData.firstName
              }


              onChange={
                handleChange
              }


              required


            />


          </InputGroup>









          <InputGroup>


            <Label>

              Last Name

            </Label>




            <Input


              name="lastName"


              value={
                formData.lastName
              }


              onChange={
                handleChange
              }


              required


            />


          </InputGroup>









          <InputGroup>


            <Label>

              Phone

            </Label>




            <Input


              name="phone"


              value={
                formData.phone
              }


              onChange={
                handleChange
              }


              required


            />


          </InputGroup>









          <InputGroup>


            <Label>

              Email

            </Label>




            <Input


              type="email"


              name="email"


              value={
                formData.email
              }


              onChange={
                handleChange
              }



            />


          </InputGroup>









          <InputGroup>


            <Label>

              Gender

            </Label>




            <Select


              name="gender"


              value={
                formData.gender
              }


              onChange={
                handleChange
              }


            >



              <option value="">

                Select gender

              </option>




              <option value="MALE">

                Male

              </option>





              <option value="FEMALE">

                Female

              </option>




            </Select>


          </InputGroup>









          {
            error && (


              <ErrorMessage>


                {error}


              </ErrorMessage>


            )
          }









          <Actions>



            <CancelButton


              type="button"


              onClick={onClose}


            >

              Cancel


            </CancelButton>








            <SubmitButton


              type="submit"


            >

              Create Member


            </SubmitButton>





          </Actions>






        </Form>







      </Modal>





    </Overlay>


  );

};


export default AddMemberModal;