import {
    Card,
    Header,
    Left,
    IconWrapper,
    Label,
    Body,
    Value,
    Trend,
    Subtitle,
} from "./StatsCard.styles";


const StatsCard = ({
    label,
    value,
    icon,
    subtitle,
    trend,
    trendType = "default",
}) => {

    return (

        <Card>

            {/* =================================
                Header
            ================================== */}

            <Header>

                <Left>

                    <IconWrapper>

                        {icon}

                    </IconWrapper>

                    <Label>

                        {label}

                    </Label>

                </Left>

            </Header>


            {/* =================================
                Body
            ================================== */}

            <Body>

                <Value>

                    {value ?? 0}

                </Value>


                {trend && (

                    <Trend
                        type={trendType}
                    >

                        {trend}

                    </Trend>

                )}

            </Body>


            {/* =================================
                Subtitle
            ================================== */}

            {subtitle && (

                <Subtitle>

                    {subtitle}

                </Subtitle>

            )}

        </Card>

    );

};


export default StatsCard;