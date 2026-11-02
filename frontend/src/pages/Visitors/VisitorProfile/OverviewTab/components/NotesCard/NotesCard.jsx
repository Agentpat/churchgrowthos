import {
    Card,
    CardTitle,
    Note,
    Empty,
} from "./NotesCard.styles";

const NotesCard = ({ visitor }) => {

    return (

        <Card>

            <CardTitle>

                Notes

            </CardTitle>

            {
                visitor.notes
                    ? (
                        <Note>
                            {visitor.notes}
                        </Note>
                    )
                    : (
                        <Empty>
                            No notes available.
                        </Empty>
                    )
            }

        </Card>

    );

};

export default NotesCard;