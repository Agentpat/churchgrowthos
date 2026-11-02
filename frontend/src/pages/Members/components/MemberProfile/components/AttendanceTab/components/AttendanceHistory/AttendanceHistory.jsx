import {
    Table,
    Row,
    HeaderRow,
    Cell,
    Title,
} from "./AttendanceHistory.styles";



const AttendanceHistory = ({
    attendance = [],
}) => {


    return (

        <div>


            <Title>
                Attendance History
            </Title>




            <Table>


                <HeaderRow>


                    <Cell>
                        Date
                    </Cell>


                    <Cell>
                        Service
                    </Cell>


                    <Cell>
                        Status
                    </Cell>


                </HeaderRow>





                {
                    attendance.map((item) => (


                        <Row
                            key={item._id}
                        >



                            <Cell>

                                {
                                    item.serviceId?.serviceDate

                                        ?

                                        new Date(
                                            item.serviceId.serviceDate
                                        )
                                            .toLocaleDateString()

                                        :

                                        item.checkedInAt

                                            ?

                                            new Date(
                                                item.checkedInAt
                                            )
                                                .toLocaleDateString()

                                            :

                                            "-"
                                }

                            </Cell>






                            <Cell>

                                {
                                    item.serviceId?.title || "-"
                                }

                            </Cell>






                            <Cell>

                                {
                                    item.status
                                }

                            </Cell>



                        </Row>


                    ))

                }



            </Table>


        </div>

    );

};


export default AttendanceHistory;