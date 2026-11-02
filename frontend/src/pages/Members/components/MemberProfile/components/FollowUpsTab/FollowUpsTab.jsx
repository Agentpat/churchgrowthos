import {
  useEffect,
  useState,
} from "react";


import FollowUpStats from "./components/FollowUpStats/FollowUpStats";
import FollowUpHistory from "./components/FollowUpHistory/FollowUpHistory";


import memberService from "../../../../../../services/memberService";


import {
  Container,
  Title,
  Description,
  Loader,
  Empty,
  Error,
} from "./FollowUpsTab.styles";





const FollowUpsTab = ({
  member,
}) => {



  const [
    followUps,
    setFollowUps,
  ] = useState([]);



  const [
    loading,
    setLoading,
  ] = useState(true);



  const [
    error,
    setError,
  ] = useState("");







  useEffect(() => {


    const loadFollowUps = async () => {


      try {


        setLoading(true);

        setError("");



        const response =
          await memberService.getMemberFollowUps(
            member._id
          );



        setFollowUps(
          response?.data || []
        );



      } catch (error) {


        console.error(
          "Failed to load member follow ups",
          error
        );



        setError(
          "Unable to load follow ups."
        );



      } finally {


        setLoading(false);


      }


    };





    if (member?._id) {


      loadFollowUps();


    } else {


      setLoading(false);


    }



  }, [
    member
  ]);









  if (loading) {


    return (

      <Container>


        <Loader>

          Loading follow ups...

        </Loader>


      </Container>

    );


  }







  if (error) {


    return (

      <Container>


        <Title>
          Follow Ups
        </Title>


        <Error>
          {error}
        </Error>


      </Container>

    );


  }







  if (!followUps.length) {


    return (

      <Container>


        <Title>
          Follow Ups
        </Title>



        <Description>

          Track pastoral care activities and member engagement.

        </Description>




        <Empty>

          No follow ups recorded yet.

        </Empty>



      </Container>

    );


  }









  return (

    <Container>



      <Title>

        Follow Ups

      </Title>





      <Description>

        Track pastoral care activities and member engagement.

      </Description>







      <FollowUpStats

        followUps={
          followUps
        }

      />








      <FollowUpHistory

        followUps={
          followUps
        }

      />





    </Container>

  );



};



export default FollowUpsTab;