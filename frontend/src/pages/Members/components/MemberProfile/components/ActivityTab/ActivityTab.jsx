import {
  useEffect,
  useState,
} from "react";


import ActivityTimeline from "./components/ActivityTimeline";


import memberService from "../../../../../../services/memberService";


import {
  Container,
  Title,
  Description,
  Loader,
  Empty,
} from "./ActivityTab.styles";







const ActivityTab = ({
  member,
}) => {



  const [
    activities,
    setActivities,
  ] = useState([]);




  const [
    loading,
    setLoading,
  ] = useState(false);







  useEffect(() => {


    const loadActivities = async () => {


      try {


        setLoading(true);



        const response =
          await memberService.getMemberActivity(
            member._id
          );





        const activityList =

          response?.data?.data ||

          response?.data ||

          [];




        setActivities(activityList);





      } catch (error) {


        console.error(
          "Failed to load member activity:",
          error
        );



        setActivities([]);



      } finally {


        setLoading(false);


      }


    };







    if (member?._id) {


      loadActivities();


    }



  }, [
    member?._id
  ]);









  if (loading) {


    return (

      <Container>

        <Loader>

          Loading activity...

        </Loader>


      </Container>

    );


  }









  return (


    <Container>


      <Title>

        Activity

      </Title>





      <Description>

        Track member activities and engagement history.

      </Description>








      {
        activities.length > 0 ? (


          <ActivityTimeline

            activities={activities}

          />


        ) : (


          <Empty>

            No activity recorded yet.

          </Empty>


        )
      }






    </Container>


  );


};






export default ActivityTab;