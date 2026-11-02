import {
    Card,
    Header,
    IconWrapper,
    Title,
    Value,
    Description,
} from "./MetricCard.styles";



const MetricCard = ({
    title,
    value,
    description,
    icon: Icon,
}) => {


    return (

        <Card>


            <Header>


                <Title>
                    {title}
                </Title>



                {
                    Icon && (

                        <IconWrapper>

                            <Icon />

                        </IconWrapper>

                    )
                }


            </Header>





            <Value>

                {value}

            </Value>





            <Description>

                {description}

            </Description>



        </Card>

    );

};



export default MetricCard;