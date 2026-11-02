import {
  Container,
  Header,
  Title,
  Value,
  ProgressWrapper,
  ProgressBar,
  Status,
} from "./HealthMetric.styles";



const HealthMetric = ({
  title,
  value = 0,
}) => {



  const getStatus = () => {


    if (value >= 80) {

      return "Healthy";

    }


    if (value >= 50) {

      return "Needs Attention";

    }


    return "Critical";


  };





  return (

    <Container>


      <Header>


        <Title>

          {title}

        </Title>



        <Value>

          {value}%

        </Value>


      </Header>





      <ProgressWrapper>


        <ProgressBar

          value={value}

        />


      </ProgressWrapper>





      <Status>

        {getStatus()}

      </Status>



    </Container>

  );

};



export default HealthMetric;