import {
    StatCardContainer,
    StatHeader,
    StatTitle,
    StatIcon,
    StatValue,
    StatDescription,
} from "./StatCard.styles";



const StatCard = ({
    title,
    value,
    description,
    icon: Icon,
}) => {


    return (

        <StatCardContainer>


            <StatHeader>


                <StatTitle>

                    {title}

                </StatTitle>



                {
                    Icon && (

                        <StatIcon>

                            <Icon />

                        </StatIcon>

                    )
                }


            </StatHeader>




            <StatValue>

                {value}

            </StatValue>




            <StatDescription>

                {description}

            </StatDescription>



        </StatCardContainer>

    );

};



export default StatCard;