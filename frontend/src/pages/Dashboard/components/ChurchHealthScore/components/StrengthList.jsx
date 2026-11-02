import {
  Container,
  Title,
  List,
  Item,
  Icon,
} from "./StrengthList.styles";


import {
  FaCheckCircle,
} from "react-icons/fa";



const StrengthList = ({
  strengths = [],
}) => {


  return (

    <Container>


      <Title>

        Strengths

      </Title>





      <List>


        {
          strengths.length > 0 ? (

            strengths.map((strength, index) => (


              <Item
                key={index}
              >

                <Icon>

                  <FaCheckCircle />

                </Icon>


                {strength}


              </Item>


            ))


          ) : (


            <Item>

              No strengths identified yet.

            </Item>


          )
        }


      </List>



    </Container>

  );

};



export default StrengthList;