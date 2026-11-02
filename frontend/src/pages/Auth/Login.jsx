import {
  useState,
} from "react";


import {
  Navigate,
  useNavigate,
} from "react-router-dom";


import {
  useAuth,
} from "../../context/AuthContext";


import Input from "../../components/ui/Input/Input";

import Button from "../../components/ui/Button/Button";


import {
  PageWrapper,
  LoginCard,
  Brand,
  Title,
  Subtitle,
  Form,
  ErrorBox,
} from "./Login.styles";



const Login = () => {


  const navigate = useNavigate();



  const {
    login,
    isAuthenticated,
  } = useAuth();




  const [formData, setFormData] = useState({

    email: "",
    password: "",

  });




  const [error, setError] = useState("");



  const [loading, setLoading] = useState(false);






  if (isAuthenticated) {

    return (

      <Navigate

        to="/"

        replace

      />

    );

  }







  const handleChange = (e) => {


    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });


  };








  const handleSubmit = async (e) => {


    e.preventDefault();



    if (loading) return;



    try {


      setLoading(true);


      setError("");



      await login(formData);



      navigate(

        "/",

        {
          replace: true,
        }

      );



    } catch (error) {


      setError(

        error?.response?.data?.message ||

        error?.message ||

        "Unable to login. Please try again."

      );


    } finally {


      setLoading(false);


    }


  };








  return (

    <PageWrapper>


      <LoginCard>


        <Brand>

          ChurchOS

        </Brand>




        <Title>

          Welcome Back

        </Title>




        <Subtitle>

          Sign in to manage your church.

        </Subtitle>





        {
          error && (

            <ErrorBox>

              {error}

            </ErrorBox>

          )
        }





        <Form

          onSubmit={handleSubmit}

        >



          <Input

            label="Email"

            name="email"

            type="email"

            placeholder="Enter your email"

            value={formData.email}

            onChange={handleChange}

            required

          />





          <Input

            label="Password"

            name="password"

            type="password"

            placeholder="Enter your password"

            value={formData.password}

            onChange={handleChange}

            required

          />






          <Button

            type="submit"

            disabled={loading}

            size="large"

          >

            {

              loading

                ? "Signing in..."

                : "Sign In"

            }


          </Button>




        </Form>




      </LoginCard>




    </PageWrapper>

  );

};



export default Login;