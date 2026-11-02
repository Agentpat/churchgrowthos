import { useNavigate } from "react-router-dom";


import {
  Card,
  Header,
  IconBox,
  Content,
  GroupName,
  TypeBadge,
  Description,
  Details,
  DetailItem,
  Label,
  Value,
  Footer,
  MemberCount,
  Button,
} from "./GroupCard.styles";


import {
  FaUsers,
} from "react-icons/fa";




const GroupCard = ({
  group,
}) => {


  const navigate = useNavigate();




  const handleView = () => {

    navigate(
      `/groups/${group._id}`
    );

  };






  return (


    <Card>



      <Header>


        <IconBox>

          <FaUsers />

        </IconBox>



        <Content>


          <GroupName>

            {group.name}

          </GroupName>




          <TypeBadge>

            {group.type}

          </TypeBadge>



        </Content>



      </Header>









      <Description>


        {
          group.description ||

          "No description available."
        }


      </Description>









      <Details>



        <DetailItem>


          <Label>

            Leader

          </Label>


          <Value>


            {
              group.leader

                ?

                `${group.leader.firstName} ${group.leader.lastName}`

                :

                "Not assigned"
            }


          </Value>



        </DetailItem>









        <DetailItem>


          <Label>

            Members

          </Label>


          <Value>

            {
              group.memberCount || 0
            }


          </Value>



        </DetailItem>





      </Details>









      <Footer>



        <MemberCount>

          👥 {
            group.memberCount || 0
          } members


        </MemberCount>





        <Button

          onClick={handleView}

        >

          View Details


        </Button>





      </Footer>





    </Card>


  );

};



export default GroupCard;