import {
  Container,
  Title,
  List,
  Item,
  Icon,
} from "./RecommendationList.styles";


import {
  FaExclamationTriangle,
} from "react-icons/fa";



const RecommendationList = ({
  recommendations = [],
}) => {


  return (

    <Container>


      <Title>

        Recommendations

      </Title>





      <List>


        {
          recommendations.length > 0 ? (


            recommendations.map(
              (recommendation, index) => (


                <Item
                  key={index}
                >

                  <Icon>

                    <FaExclamationTriangle />

                  </Icon>


                  {recommendation}


                </Item>


              )


            )


          ) : (


            <Item>

              No recommendations available.

            </Item>


          )
        }



      </List>



    </Container>

  );

};



export default RecommendationList;