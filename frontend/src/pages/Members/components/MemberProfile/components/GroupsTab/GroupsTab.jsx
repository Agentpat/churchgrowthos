import {
  useEffect,
  useState,
} from "react";


import memberService from "../../../../../../services/memberService";


import GroupList from "./components/GroupList/GroupList";


import {
  Container,
  Title,
  Description,
  Loader,
  Empty,
} from "./GroupsTab.styles";



const GroupsTab = ({
  member,
}) => {


  const [
    groups,
    setGroups,
  ] = useState([]);



  const [
    loading,
    setLoading,
  ] = useState(true);





  useEffect(() => {


    const loadGroups = async () => {


      try {


        const response =
          await memberService.getMemberGroups(
            member._id
          );


        setGroups(
          response?.data || []
        );



      } catch(error) {


        console.error(
          "Failed to load member groups",
          error
        );


      } finally {


        setLoading(false);


      }


    };



    if(member?._id){

      loadGroups();

    }


  },[
    member
  ]);






  if(loading){

    return (

      <Container>

        <Loader>
          Loading groups...
        </Loader>

      </Container>

    );

  }






  if(!groups.length){

    return (

      <Container>

        <Title>
          Groups
        </Title>


        <Description>
          View ministries, departments and fellowships this member belongs to.
        </Description>


        <Empty>
          This member is not assigned to any group yet.
        </Empty>


      </Container>

    );

  }







  return (

    <Container>


      <Title>
        Groups
      </Title>



      <Description>
        View ministries, departments and fellowships this member belongs to.
      </Description>




      <GroupList
        groups={groups}
      />



    </Container>

  );

};



export default GroupsTab;