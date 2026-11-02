import {
    Card,
    CardTitle,
    InfoList,
    Row,
    Label,
    Value,
} from "./VisitInformationCard.styles";

const VisitInformationCard = ({ visitor }) => {

    return (

        <Card>

            <CardTitle>

                Visit Information

            </CardTitle>

            <InfoList>

                <Row>

                    <Label>

                        First Visit

                    </Label>

                    <Value>

                        {
                            visitor.visitDate
                                ? new Date(visitor.visitDate).toLocaleDateString()
                                : "-"
                        }

                    </Value>

                </Row>

                <Row>

                    <Label>

                        Source

                    </Label>

                    <Value>

                        {visitor.source || "-"}

                    </Value>

                </Row>

                <Row>

                    <Label>

                        Invited By

                    </Label>

                    <Value>

                        {visitor.invitedBy || "-"}

                    </Value>

                </Row>

            </InfoList>

        </Card>

    );

};

export default VisitInformationCard;