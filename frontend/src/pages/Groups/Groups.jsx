import { useEffect, useState } from "react";


import {
  Container,
  Header,
  Title,
  Description,
  Actions,
} from "./Groups.styles";



import GroupStats from "./components/GroupStats/GroupStats";


import GroupList from "./components/GroupList/GroupList";


import CreateGroupModal from "./components/CreateGroupModal/CreateGroupModal";


import groupService from "../../services/groupService";



const Groups = () => {


  const [groups, setGroups] = useState([]);


  const [loading, setLoading] = useState(true);


  const [showModal, setShowModal] = useState(false);





  const fetchGroups = async () => {


    try {


      setLoading(true);



      const response =
        await groupService.getGroups();



      setGroups(
        response.data
      );



    } catch (error) {


      console.error(
        "Failed loading groups",
        error
      );



    } finally {


      setLoading(false);


    }


  };







  useEffect(() => {


    fetchGroups();


  }, []);







  const handleGroupCreated = () => {


    setShowModal(false);


    fetchGroups();


  };








  return (

    <Container>




      <Header>



        <div>


          <Title>

            Groups

          </Title>



          <Description>

            Manage church ministries, departments, units and fellowships.

          </Description>



        </div>






        <Actions>


          <button

            onClick={() =>
              setShowModal(true)
            }

          >

            Create Group


          </button>



        </Actions>



      </Header>






      {/* Group Overview Statistics */}


      <GroupStats

        groups={groups}

      />








      {/* Group Cards */}


      <GroupList

        groups={groups}

        loading={loading}

      />








      {


        showModal && (


          <CreateGroupModal


            onSuccess={handleGroupCreated}



            onClose={() =>
              setShowModal(false)
            }



          />


        )


      }






    </Container>

  );

};



export default Groups;